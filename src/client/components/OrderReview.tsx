import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatPrice } from "../../controllers/utils";
import { IOrderDetail } from "../../model/order";
import { SubHeader } from "../pages/OrderSuccess";
import { AddressDetails } from "./AddressDetails";
import { OrderSummaryItem } from "./OrderSummaryItem";

interface OrderReviewProps {
  orderDetail: IOrderDetail;
}

export const OrderReview = ({ orderDetail }: OrderReviewProps) => {
  return (
    <Paper sx={{ padding: "16px 32px 32px" }}>
      <Typography variant="h3" fontWeight="bold">
        Order ID - {orderDetail.order.id}
      </Typography>
      <Grid container mt="20px">
        <Grid item md={5}>
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
            {new Date(orderDetail.order.orderDate).toDateString()}
          </Typography>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item md={6}>
              <Box mb="8px">
                <SubHeader>Delivery Address</SubHeader>
                <AddressDetails address={orderDetail.order.deliveryAddress} />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <SubHeader>Billing Address</SubHeader>
                <AddressDetails address={orderDetail.order.billingAddress} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
    </Paper>
  );
};
