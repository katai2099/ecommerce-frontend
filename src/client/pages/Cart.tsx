import { ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, stockCheck } from "../../controllers/cart";
import { formatPrice, showSnackBar } from "../../controllers/utils";
import { IStockCountCheck } from "../../model/cart";
import { OUT_OF_STOCK_MESSAGE } from "../../model/constant";
import { setCartLoading } from "../../reducers/cartReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import {
  CartSkeletonLoading,
  CartTotalSkeletonLoading,
} from "../components/SkeletonLoading";
import { CartItemDetail } from "../components/cart/CartItemDetail";
import { LoadingButton } from "../components/common/LoadingButton";

export const Cart = () => {
  const cartData = useSelector((state: RootState) => state.cart);
  const carts = cartData.carts;
  const cartLoading = cartData.cartLoading;
  let totalItems = 0;
  const totalPrice = carts.reduce((accumulator, currentValue) => {
    totalItems += currentValue.quantity;
    return accumulator + currentValue.quantity * currentValue.product.price;
  }, 0);
  const [checkStock, setCheckStock] = useState<boolean>(false);
  const [stockCheckResponse, setStockCheckResponse] = useState<
    IStockCountCheck[]
  >([]);
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLogin) {
      getCart();
    } else {
      dispatch(setCartLoading(false));
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
      .catch((err) => {})
      .finally(() => setCheckStock(false));
  }

  return (
    <AppBox>
      <Typography textAlign="center" fontSize="26px" fontWeight="bold">
        Shopping bag
      </Typography>
      <Grid container mt="32px" gap="32px">
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              width: "100%",
              padding: { xs: "32px 16px 16px", sm: "32px 32px 16px" },
            }}
          >
            <Box display="flex" alignItems="center" mb="16px">
              <Typography variant="h3">Shopping Bag &nbsp;</Typography>
              <Typography color="GrayText">
                {cartLoading ? (
                  <Skeleton width="100px" />
                ) : (
                  `(${totalItems} items)`
                )}
              </Typography>
            </Box>
            {!cartLoading &&
              carts.map((cartItem, idx) => (
                <CartItemDetail
                  key={idx}
                  cartItem={cartItem}
                  index={idx}
                  stockCheck={stockCheckResponse}
                />
              ))}
            {cartLoading && <CartSkeletonLoading amount={4} />}
            {!cartLoading && carts.length === 0 && (
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
            {cartLoading ? (
              <CartTotalSkeletonLoading />
            ) : (
              <>
                <Box padding=" 8px 0px 8px">
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
                <Divider sx={{ mb: { xs: "16px", md: "32px" } }} />
                <LoadingButton
                  title={"Proceed to checkout"}
                  fullWidth={true}
                  disabled={carts.length === 0}
                  onClick={handleProceedClick}
                  loading={checkStock}
                />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </AppBox>
  );
};
