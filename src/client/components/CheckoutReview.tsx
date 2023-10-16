import { Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { PaymentMethod } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { IAddress } from "../../model/user";
import { setPlaceOrderError, setStep } from "../../reducers/checkoutReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AddressDetails } from "./AddressDetails";
import {
  AmericanExpressLogo,
  JCBLogo,
  MastercardLogo,
  UnionPayLogo,
  VisaLogo,
} from "./common/Icon";

interface CheckoutReviewProps {
  paymentMethod: PaymentMethod;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
}

export const CheckoutReview = ({
  paymentMethod,
  deliveryAddress,
  billingAddress,
}: CheckoutReviewProps) => {
  const checkoutInfo = useSelector((state: RootState) => state.checkout);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Box>
        <Typography variant="h3" mb="8px" pl="16px">
          1. Delivery
        </Typography>

        <Paper sx={{ padding: "16px 20px 8px", mb: "16px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            mb="16px"
            alignItems="center"
          >
            <Typography variant="h3">Delivery Address</Typography>
            <IconButton
              size="small"
              onClick={() => {
                dispatch(setPlaceOrderError(false));
                dispatch(setStep(0));
                window.scrollTo(0, 0);
              }}
            >
              <Edit />
            </IconButton>
          </Box>
          <AddressDetails address={deliveryAddress} />
        </Paper>
        <Paper sx={{ padding: "16px 20px 8px", mb: "16px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            mb="16px"
            alignItems="center"
          >
            <Typography variant="h3">Billing Address</Typography>
            <IconButton
              size="small"
              onClick={() => {
                dispatch(setPlaceOrderError(false));
                dispatch(setStep(0));
                window.scrollTo(0, 0);
              }}
            >
              <Edit />
            </IconButton>
          </Box>
          <AddressDetails address={billingAddress} />
        </Paper>
      </Box>
      <Box>
        <Typography variant="h3" mb="8px">
          2. Payment
        </Typography>
        <Paper sx={{ padding: "16px 20px 8px", mb: "16px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            mb="16px"
            alignItems="center"
          >
            <Typography variant="h3">Payment details</Typography>
            <IconButton
              size="small"
              onClick={() => {
                dispatch(setPlaceOrderError(false));
                dispatch(setStep(1));
                window.scrollTo(0, 0);
              }}
            >
              <Edit />
            </IconButton>
          </Box>
          {paymentMethod && (
            <Box display="flex" gap="16px">
              <Box>
                {paymentMethod.card?.brand === "mastercard" && (
                  <MastercardLogo />
                )}
                {paymentMethod.card?.brand === "amex" && (
                  <AmericanExpressLogo />
                )}
                {paymentMethod.card?.brand === "jcb" && <JCBLogo />}
                {paymentMethod.card?.brand === "unionpay" && <UnionPayLogo />}
                {paymentMethod.card?.brand === "visa" && <VisaLogo />}
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography>{checkoutInfo.nameOnCard}</Typography>
                <Box>ending in {paymentMethod.card?.last4}</Box>
                <Box>
                  {`expires: ${paymentMethod.card?.exp_month} ${paymentMethod.card?.exp_year}`}
                </Box>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};
