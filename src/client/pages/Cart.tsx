import { ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../controllers/utils";
import { RootState } from "../../reducers/combineReducer";
import { AppBox } from "../../styles/common";
import { CartItemDetail } from "../components/cart/CartItemDetail";

export const Cart = () => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const totalPrice = carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.product.price;
  }, 0);
  const navigate = useNavigate();
  return (
    <AppBox>
      <Typography textAlign="center" fontSize="26px" fontWeight="bold">
        Shopping bag
      </Typography>
      <Grid container mt="32px" gap="32px">
        <Grid item md={7}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            <Box display="flex" alignItems="center" mb="16px">
              <Typography variant="h3">Shopping Bag &nbsp;</Typography>
              <Typography color="GrayText">({carts.length} item)</Typography>
            </Box>
            {carts.map((cartItem, idx) => (
              <CartItemDetail key={idx} cartItem={cartItem} index={idx} />
            ))}
            {carts.length === 0 && (
              <Box textAlign="center">
                <ShoppingBagOutlined
                  sx={{ fontSize: "96px", color: "grayText", opacity: "0.7" }}
                />
                <Typography variant="h3" pb="8px">
                  Shopping bag is Empty!
                </Typography>
                <Typography color="GrayText">
                  Look like you have no items in your shopping bag.
                </Typography>
              </Box>
            )}
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
              <Typography variant="h3">Total</Typography>
              <Typography fontWeight="bold">
                {formatPrice(totalPrice)}
              </Typography>
            </Box>
            <Divider />
            <Button
              fullWidth
              sx={{
                mt: "32px",
                "&.Mui-disabled": {
                  color: "#4b4b4b",
                  cursor: "not-allowed",
                  pointerEvents: "all !important",
                },
              }}
              variant="contained"
              disabled={carts.length === 0}
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Proceed To Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </AppBox>
  );
};
