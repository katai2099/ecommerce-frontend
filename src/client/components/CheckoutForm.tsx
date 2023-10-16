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
import { confirmPayment, placeOrder, stockCheck } from "../../controllers/cart";
import { validateAddress } from "../../controllers/user";
import { isRecordValueEmpty, showSnackBar } from "../../controllers/utils";
import { OutOfStockError, PaymentError } from "../../model/PaymentError";
import {
  setBillingAddressError,
  setCheckoutPaymentError,
  setDeliveryAddressError,
  setNameOnCardError,
  setPlaceOrderError,
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
  const finalBillingAddress = checkoutInfo.isBillingSameAsDelivery
    ? finalDeliveryAddress
    : checkoutInfo.isNewBillingAddress
    ? billingAddress
    : checkoutInfo.addresses[checkoutInfo.selectedBillingAddressIndex];

  const handleStepChange = (step: number) => {
    dispatch(setPlaceOrderError(false));
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

    stockCheck()
      .then((stockCheckRes) => {
        if (stockCheckRes.length > 0) {
          throw new OutOfStockError();
        }
        return confirmPayment(paymentMethod!.id)
          .then((res) => {
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
              throw new PaymentError(
                res.error.message || "",
                res.error.type === "card_error"
              );
            }
            const paymentId = res?.paymentIntent?.id;
            return placeOrder(
              finalDeliveryAddress,
              finalBillingAddress,
              paymentId!
            );
          })
          .then((res) => {
            navigate(`/orders/complete?order=${res}`, { replace: true });
          });
      })
      .catch((err) => {
        if (err instanceof OutOfStockError) {
          navigate("/orders/failure", {
            replace: true,
            state: {
              outOfStock: true,
            },
          });
        } else {
          dispatch(setPlaceOrderError(true));
          if (err instanceof PaymentError) {
            showSnackBar(
              err.isCardError
                ? `${err.message}. Please update your payment info`
                : "something went wrong. Please start the step over again",
              "error"
            );
          } else {
            showSnackBar(
              "something went wrong. Please start the step over again",
              "error"
            );
          }
        }
      })
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
      if (
        !checkoutInfo.isBillingSameAsDelivery &&
        checkoutInfo.isNewBillingAddress
      ) {
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
            setCreatePaymentLoading(true);
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
            throw res?.error;
          }
          setPaymentMethod(res?.paymentMethod);
          handleGoToNextStep();
        })
        .catch((err) => {
          showSnackBar(err.message, "error");
          dispatch(setCheckoutPaymentError(err.message));
        })
        .finally(() => setCreatePaymentLoading(false));
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
      <Grid container sx={{ mt: { xs: "8px", md: "32px" } }} spacing={3}>
        <Grid item xs={12} md={8}>
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
              disabled={!stripe || !elements || checkoutInfo.placeOrderError}
              onClick={handleStepButtonClick}
              outlinedLoading={true}
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
        <Grid
          item
          xs={12}
          md={4}
          sx={{ order: { xs: -1, md: 1 }, mt: { md: "32px", xs: "0" } }}
        >
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
