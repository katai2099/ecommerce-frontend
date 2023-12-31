import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCheckoutData } from "../../controllers/cart";
import { getUserAddresses } from "../../controllers/user";
import { showSnackBar } from "../../controllers/utils";
import { EmptyCartError } from "../../model/PaymentError";
import {
  OUT_OF_STOCK_MESSAGE,
  STRIPE_PUBLISHABLE_KEY,
} from "../../model/constant";
import { setAddresses } from "../../reducers/checkoutReducer";
import { setLoading } from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox, SomethingWentWrong } from "../../styles/common";
import { CheckoutForm } from "../components/CheckoutForm";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const Checkout = () => {
  const [total, setTotal] = useState<number>(0);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));
    getCheckoutData()
      .then((res) => {
        setTotal(res.total);
        if (res.carts.length === 0) {
          navigate("/cart", { replace: true });
          throw new EmptyCartError();
        }
        return getUserAddresses();
      })
      .then((addresses) => dispatch(setAddresses(addresses)))
      .catch((err) => {
        setError(true);
        dispatch(setLoading(false));
        if (axios.isAxiosError(err) && err.response?.status === 400) {
          showSnackBar(OUT_OF_STOCK_MESSAGE, "error");
          navigate("/cart", { replace: true });
        }
      })
      .finally(() => {
        setFirstLoad(false);
      });
  }, []);

  return (
    <AppBox>
      {!firstLoad && !error && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: total * 100,
            currency: "eur",
            paymentMethodCreation: "manual",
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
      {error && <SomethingWentWrong />}
    </AppBox>
  );
};
