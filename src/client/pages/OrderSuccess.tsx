import styled from "@emotion/styled";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderDetail } from "../../controllers/order";
import { IOrderDetail, OrderDetail } from "../../model/order";
import { resetCheckoutState } from "../../reducers/checkoutReducer";
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
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>(
    new OrderDetail()
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const orderId = query.get("order");
    dispatch(resetCheckoutState());
    getOrderDetail(orderId!)
      .then((res) => {
        setOrderDetail(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          The order confirmation will be sent to {orderDetail.user.email}
        </Typography>
      </Box>
      <Box mt="48px">
        <OrderReview orderDetail={orderDetail} />
      </Box>
      <Box mt="48px">
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
