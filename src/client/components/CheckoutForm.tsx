import {
  Box,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";
import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmPaymentAction } from "../../actions/orderActions";
import { placeOrder } from "../../controllers/cart";
import { validateAddress } from "../../controllers/user";
import { isRecordValueEmpty } from "../../controllers/utils";
import { resetCart } from "../../reducers/cartReducer";
import {
  setBillingAddressError,
  setCheckoutPaymentError,
  setDeliveryAddressError,
  setNameOnCardError,
  setStep,
} from "../../reducers/checkoutReducer";
import { RootState } from "../../reducers/combineReducer";
import { setLoading } from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";
import { CheckoutAddress } from "./CheckoutAddress";
import { CheckoutPayment } from "./CheckoutPayment";
import { CheckoutReview } from "./CheckoutReview";
import { CheckoutSummary } from "./CheckoutSummary";
import { LoadingButton } from "./common/LoadingButton";

const steps = ["Delivery", "Payment", "Review"];

export const CheckoutForm = () => {
  const checkoutInfo = useSelector((state: RootState) => state.checkout);
  const deliveryAddress = checkoutInfo.deliveryAddress;
  const billingAddress = checkoutInfo.billingAddress;
  const isBillingSameAsDelivery = checkoutInfo.isBillingSameAsDelivery;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [createPaymentLoading, setCreatePaymentLoading] =
    useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const finalDeliveryAddress = checkoutInfo.isNewDeliveryAddress
    ? deliveryAddress
    : checkoutInfo.addresses[checkoutInfo.selectedDeliveryAddressIndex];
  const finalBillingAddress = checkoutInfo.isNewBillingAddress
    ? billingAddress
    : !checkoutInfo.isNewBillingAddress && isBillingSameAsDelivery
    ? finalDeliveryAddress
    : checkoutInfo.addresses[checkoutInfo.selectedBillingAddressIndex];

  const handleStepChange = (step: number) => {
    dispatch(setCheckoutPaymentError(""));
    dispatch(setStep(step));
  };

  const handleGoToNextStep = () => {
    handleStepChange(checkoutInfo.step + 1);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    if (!stripe || !elements) {
      return;
    }

    dispatch(setLoading(true));

    dispatch(confirmPaymentAction({ paymentMethodId: paymentMethod!.id }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.status === "requires_action") {
          return stripe.handleNextAction({
            clientSecret: res.clientSecret,
          });
        } else if (res.status === "requires_confirmation") {
          return stripe.confirmPayment({
            clientSecret: res.clientSecret,
            elements,
            confirmParams: {
              return_url: "http://localhost:3000/orders/complete",
            },
            redirect: "if_required",
          });
        }
      })
      .then((res) => {
        if (res?.error) {
          throw new Error();
        }
        const paymentId = res?.paymentIntent?.id;
        return placeOrder(
          finalDeliveryAddress,
          finalBillingAddress,
          paymentId!
        );
      })
      .then((res) => {
        dispatch(resetCart());
        navigate(`/orders/complete?order=${res}`, { replace: true });
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleStepButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (checkoutInfo.step === 0) {
      let isDeliveryEmpty = true;
      let isBillingEmpty = true;
      if (checkoutInfo.isNewDeliveryAddress) {
        const error = validateAddress(checkoutInfo.deliveryAddress);
        isDeliveryEmpty = isRecordValueEmpty(error, ["id", "isDefault"]);
        if (!isDeliveryEmpty) {
          dispatch(setDeliveryAddressError(error));
        }
      }
      if (checkoutInfo.isNewBillingAddress) {
        const error = validateAddress(checkoutInfo.billingAddress);
        isBillingEmpty = isRecordValueEmpty(error, ["id", "isDefault"]);
        if (!isBillingEmpty) {
          dispatch(setBillingAddressError(error));
        }
      }
      if (!isDeliveryEmpty || !isBillingEmpty) {
        return;
      }
      handleGoToNextStep();
    } else if (checkoutInfo.step === 1) {
      if (checkoutInfo.nameOnCard.trim() === "") {
        dispatch(setNameOnCardError("name on card cannot be empty"));
        return;
      }
      elements
        ?.submit()
        .then((res) => {
          if (res.error) {
            throw res.error;
          } else {
            console.log(finalBillingAddress);
            return stripe?.createPaymentMethod({
              elements,
              params: {
                billing_details: {
                  name: checkoutInfo.nameOnCard.trim(),
                  email: user.email,
                  phone: finalBillingAddress.phoneNumber,
                  address: {
                    line1: `${finalBillingAddress.street} ${finalBillingAddress.houseNumber}`,
                    city: finalBillingAddress.city,
                    country: finalBillingAddress.country,
                    postal_code: finalBillingAddress.zipCode,
                  },
                },
              },
            });
          }
        })
        .then((res) => {
          if (res!.error) {
            throw res?.error; // Throw an error if there's a payment error.
          }
          console.log(res?.paymentMethod);
          setPaymentMethod(res?.paymentMethod);
          handleGoToNextStep();
        })
        .catch((err) => {
          console.log(err);
          dispatch(setCheckoutPaymentError(err.message));
        });
    } else if (checkoutInfo.step === 2) {
      handlePlaceOrder();
    }
  };

  return (
    <Box>
      <Typography
        p="8px 0 32px"
        textAlign="center"
        variant="h3"
        fontWeight="bold"
      >
        Checkout
      </Typography>
      <Stepper activeStep={checkoutInfo.step} alternativeLabel>
        {steps.map((label, idx) => (
          <Step key={label}>
            <StepLabel
              sx={
                checkoutInfo.step > idx
                  ? {
                      "&:hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (checkoutInfo.step > idx) {
                  handleStepChange(idx);
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container mt="32px" spacing={3}>
        <Grid item md={8}>
          <CheckoutPayment />
          {checkoutInfo.step === 0 && <CheckoutAddress />}
          {checkoutInfo.step === 2 && (
            <CheckoutReview
              paymentMethod={paymentMethod!}
              deliveryAddress={finalDeliveryAddress}
              billingAddress={finalBillingAddress}
            />
          )}
          <Paper sx={{ padding: "16px 20px 8px", mb: "32px" }}>
            <LoadingButton
              loading={createPaymentLoading}
              fullWidth={true}
              disabled={!stripe || !elements}
              onClick={handleStepButtonClick}
              title={
                checkoutInfo.step === 0
                  ? "Proceed to payment"
                  : checkoutInfo.step === 1
                  ? "Proceed to review"
                  : "Place order"
              }
            />
          </Paper>
        </Grid>
        <Grid item mt="32px" md={4}>
          <Box position="sticky" top="100px">
            <CheckoutSummary
              step={checkoutInfo.step}
              onPlaceOrder={handlePlaceOrder}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
