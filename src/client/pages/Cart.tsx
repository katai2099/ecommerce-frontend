import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { AppBox } from "../../styles/common";
import { CartItemDetail } from "../components/cart/CartItemDetail";

export const Cart = () => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const totalPrice = carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.product.price;
  }, 0);
  return (
    <AppBox>
      <Typography textAlign="center" fontSize="26px" fontWeight="bold">
        Shopping bag
      </Typography>
      <Grid container mt="32px" gap="32px">
        <Grid item md={7}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            {carts.map((cartItem, idx) => (
              <CartItemDetail key={idx} cartItem={cartItem} index={idx} />
            ))}
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="32px"
            >
              <Typography>Total</Typography>
              <Typography fontWeight="bold">
                $
                {totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Divider />
            <Button fullWidth sx={{ mt: "32px" }} variant="contained">
              Proceed To Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </AppBox>
  );
};
