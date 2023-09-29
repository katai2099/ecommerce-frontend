import { Box, Paper, Typography } from "@mui/material";
import { PaymentMethod } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { IAddress } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
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

  return (
    <Box>
      <Box>
        <Typography variant="h3" mb="8px">
          1. Delivery
        </Typography>
        <Paper sx={{ padding: "16px 20px 8px", mb: "16px" }}>
          <Typography variant="h3" mb="16px">
            Delivery Address
          </Typography>
          <AddressDetails address={deliveryAddress} />
        </Paper>
        <Paper sx={{ padding: "16px 20px 8px", mb: "16px" }}>
          <Typography variant="h3" mb="16px">
            Billing Address
          </Typography>
          <AddressDetails address={billingAddress} />
        </Paper>
      </Box>
      <Box>
        <Typography variant="h3" mb="8px">
          2. Payment
        </Typography>
        <Paper sx={{ padding: "16px 20px 8px", mb: "16px" }}>
          <Typography variant="h3" mb="16px">
            Payment details
          </Typography>
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
