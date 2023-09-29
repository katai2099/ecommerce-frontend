import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { getCheckoutData } from "../../controllers/checkout";
import { getUserAddresses } from "../../controllers/user";
import { setAddresses } from "../../reducers/checkoutReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constant";
import { CheckoutForm } from "../components/CheckoutForm";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const Checkout = () => {
  const [total, setTotal] = useState<number>(0);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [emptyCart, setEmptyCart] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCheckoutData()
      .then((res) => {
        setTotal(res.total);
        setEmptyCart(res.carts.length === 0);
        return getUserAddresses();
      })
      .then((addresses) => dispatch(setAddresses(addresses)))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setFirstLoad(false));
  }, []);

  return (
    <AppBox>
      {!firstLoad && !emptyCart && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: total,
            currency: "eur",
            paymentMethodCreation: "manual",
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </AppBox>
  );
};
