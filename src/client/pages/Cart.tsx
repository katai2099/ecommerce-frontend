import { ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, stockCheck } from "../../controllers/cart";
import { formatPrice, showSnackBar } from "../../controllers/utils";
import { IStockCountCheck } from "../../model/cart";
import { OUT_OF_STOCK_MESSAGE } from "../../model/constant";
import { RootState } from "../../reducers/combineReducer";
import { AppBox } from "../../styles/common";
import { CartItemDetail } from "../components/cart/CartItemDetail";
import { LoadingButton } from "../components/common/LoadingButton";

export const Cart = () => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const totalPrice = carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.product.price;
  }, 0);
  const [checkStock, setCheckStock] = useState<boolean>(false);
  const [stockCheckResponse, setStockCheckResponse] = useState<
    IStockCountCheck[]
  >([]);
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      getCart();
    }
  }, []);

  function handleProceedClick(event: MouseEvent<HTMLButtonElement>): void {
    setCheckStock(true);
    stockCheck()
      .then((res) => {
        setStockCheckResponse(res);
        if (res.length === 0) {
          navigate("/checkout");
        } else {
          showSnackBar(OUT_OF_STOCK_MESSAGE, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setCheckStock(false));
  }

  return (
    <AppBox>
      <Typography textAlign="center" fontSize="26px" fontWeight="bold">
        Shopping bag
      </Typography>
      <Grid container mt="32px" gap="32px">
        <Grid item xs={12} md={7}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            <Box display="flex" alignItems="center" mb="16px">
              <Typography variant="h3">Shopping Bag &nbsp;</Typography>
              <Typography color="GrayText">({carts.length} item)</Typography>
            </Box>
            {carts.map((cartItem, idx) => (
              <CartItemDetail
                key={idx}
                cartItem={cartItem}
                index={idx}
                stockCheck={stockCheckResponse}
              />
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

        <Grid item xs={12} md={4}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            <Box padding=" 8px 20px 8px">
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal:</Typography>
                <Typography>{formatPrice(totalPrice)}</Typography>
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
                  {formatPrice(totalPrice)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: "32px" }} />
            <LoadingButton
              title={"Proceed to checkout"}
              fullWidth={true}
              disabled={carts.length === 0}
              onClick={handleProceedClick}
              loading={checkStock}
            />
          </Paper>
        </Grid>
      </Grid>
    </AppBox>
  );
};
