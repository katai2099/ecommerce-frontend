import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { formatPrice } from "../../controllers/utils";
import { RootState } from "../../reducers/combineReducer";
import { OrderDetailProduct } from "./order/OrderDetailProduct";

interface CheckoutSummaryProps {
  step: number;
  onPlaceOrder: () => void;
}

export const CheckoutSummary = ({
  step,
  onPlaceOrder,
}: CheckoutSummaryProps) => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const total = carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.product.price * currentValue.quantity;
  }, 0);
  return (
    <Paper sx={{ mb: "32px" }}>
      <Box padding="16px 20px 8px">
        <Typography variant="h3" mb="8px">
          Summary
        </Typography>
        <Box maxHeight="310px" sx={{ overflow: "scroll" }} mb="8px">
          {carts.map((cartItem) => (
            <OrderDetailProduct key={cartItem.id} cartItem={cartItem} />
          ))}
        </Box>
      </Box>
      <Divider />
      <Box mt="8px" padding=" 8px 20px 8px">
        <Box display="flex" justifyContent="space-between">
          <Typography>Subtotal:</Typography>
          <Typography>{formatPrice(total)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Shipping</Typography>
          <Typography>-</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold" fontSize="16px">
            Total
          </Typography>
          <Typography fontWeight="bold" fontSize="16px">
            {formatPrice(total)}
          </Typography>
        </Box>
      </Box>

      {step === 2 && (
        <Box padding=" 8px 20px 16px">
          {/* <Typography>Payment Details</Typography> */}
          <Button variant="contained" fullWidth onClick={onPlaceOrder}>
            Place Order
          </Button>
        </Box>
      )}
    </Paper>
  );
};
