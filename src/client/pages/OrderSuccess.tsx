import styled from "@emotion/styled";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderDetail } from "../../controllers/order";
import { resetCheckoutState } from "../../reducers/checkoutReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { OrderReview } from "../components/OrderReview";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const SubHeader = styled(Typography)(({ theme }) => ({
  ...theme,
  fontWeight: "500",
  fontSize: "16px",
}));

export const OrderSuccess = () => {
  let query = useQuery();
  const orderDetail = useSelector(
    (state: RootState) => state.account.selectedOrder
  );
  const orderDetailLoading = useSelector(
    (state: RootState) => state.account.selectedOrderLoading
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const orderId = query.get("order");
    dispatch(resetCheckoutState());
    getOrderDetail(orderId!)
      .then((res) => {})
      .catch((err) => {});
  }, []);
  return (
    <AppBox>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CheckCircleOutline sx={{ fontSize: "86px", color: "green" }} />
        <Typography variant="h3">Thanks for your order!</Typography>
        <Typography color="GrayText">
          {orderDetailLoading ? (
            <Skeleton />
          ) : (
            `The order confirmation will be sent to ${orderDetail.user.email}`
          )}
        </Typography>
      </Box>
      <Box mt="48px">
        <OrderReview orderDetail={orderDetail} />
      </Box>
      <Box mt="48px" sx={{ padding: { xs: "0 16px", sm: "0" } }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Continue shopping
        </Button>
      </Box>
    </AppBox>
  );
};
