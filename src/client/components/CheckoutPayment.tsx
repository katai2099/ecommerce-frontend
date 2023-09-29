import { Box, Paper, TextField, Typography } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { setNameOnCard } from "../../reducers/checkoutReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";

export const CheckoutPayment = () => {
  const step = useSelector((state: RootState) => state.checkout.step);
  const user = useSelector((state: RootState) => state.user);
  const nameOnCard = useSelector(
    (state: RootState) => state.checkout.nameOnCard
  );

  useEffect(() => {
    dispatch(setNameOnCard(`${user.firstname} ${user.lastname}`));
  }, []);

  const dispatch = useAppDispatch();
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameOnCard(event.target.value));
  };
  return (
    <Box display={step !== 1 ? "none" : "default"}>
      <Typography variant="h3" mb="8px">
        2. Payment
      </Typography>
      <Paper sx={{ padding: "16px 20px 16px", mb: "16px" }}>
        <Typography variant="h3" mb="8px">
          Payment Details
        </Typography>
        <TextField
          placeholder="Smith"
          sx={{ mb: "8px" }}
          fullWidth
          onChange={handleNameChange}
          value={nameOnCard.trim()}
        />
        <form id="payment-form">
          <PaymentElement options={{ layout: "tabs" }} />
        </form>
      </Paper>
    </Box>
  );
};
