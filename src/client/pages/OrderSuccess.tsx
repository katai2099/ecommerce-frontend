import styled from "@emotion/styled";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderAction } from "../../actions/orderActions";
import { formatPrice } from "../../controllers/utils";
import { IOrderDetail, OrderDetail } from "../../model/order";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { AddressDetails } from "../components/AddressDetails";
import { OrderSummaryItem } from "../components/OrderSummaryItem";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const SubHeader = styled(Typography)`
  font-weight: 500;
  font-size: 16px;
`;

export const OrderSuccess = () => {
  let query = useQuery();
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>(
    new OrderDetail()
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const orderId = query.get("order");
    dispatch(getOrderAction(orderId!))
      .unwrap()
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
        <Typography variant="h3" fontWeight="bold">
          Order Details - {orderDetail.order.id}
        </Typography>
        <Grid container mt="20px">
          <Grid item md={6}>
            <Box mb="16px">
              <SubHeader>Fullname</SubHeader>
              <Typography color="GrayText">{`${orderDetail.user.firstname} ${orderDetail.user.lastname}`}</Typography>
            </Box>
            <Box mb="16px">
              <SubHeader>Email</SubHeader>
              <Typography color="GrayText">{orderDetail.user.email}</Typography>
            </Box>
            <SubHeader>Order Date</SubHeader>
            <Typography color="GrayText">
              {orderDetail.order.orderDate}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Box mb="8px">
              <SubHeader>Delivery Address</SubHeader>
              <AddressDetails address={orderDetail.order.deliveryAddress} />
            </Box>
            <SubHeader>Billing Address</SubHeader>
            <AddressDetails address={orderDetail.order.billingAddress} />
          </Grid>
        </Grid>
      </Box>
      <Box mt="48px">
        <Typography variant="h3" mb="20px" fontWeight="bold">
          Order Summary
        </Typography>
        <Divider sx={{ mb: "16px" }} />
        {orderDetail.order.orderDetails.map((order, idx) => (
          <OrderSummaryItem orderSummary={order} key={idx} />
        ))}
        <Divider />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          mt="16px"
        >
          <Box width="30%">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Sub total: </Typography>
              <Typography>
                {formatPrice(orderDetail.order.totalPrice)}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Delivery: </Typography>
              <Typography>-</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Total: </Typography>
              <Typography>
                {formatPrice(orderDetail.order.totalPrice)}
              </Typography>
            </Box>
          </Box>
        </Box>
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
