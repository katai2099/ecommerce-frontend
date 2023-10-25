import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { formatPrice } from "../../controllers/utils";
import { IOrderDetail } from "../../model/order";
import { RootState } from "../../reducers/combineReducer";
import { SubHeader } from "../pages/OrderSuccess";
import { AddressDetails } from "./AddressDetails";
import { OrderSummaryItem } from "./OrderSummaryItem";
import { OrderReviewSkeletonLoading } from "./SkeletonLoading";

interface OrderReviewProps {
  orderDetail: IOrderDetail;
}

export const OrderReview = ({ orderDetail }: OrderReviewProps) => {
  const orderDetailLoading = useSelector(
    (state: RootState) => state.account.selectedOrderLoading
  );

  if (orderDetailLoading) {
    return <OrderReviewSkeletonLoading />;
  }

  return (
    <Paper sx={{ padding: "16px 32px 32px" }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        Order ID - {orderDetail.order.id}
      </Typography>
      <Grid container mt="20px" spacing={1}>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Box mb="8px">
                <SubHeader>Delivery Address</SubHeader>
                <AddressDetails
                  gray={true}
                  address={orderDetail.order.deliveryAddress}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <SubHeader>Billing Address</SubHeader>
                <AddressDetails
                  gray={true}
                  address={orderDetail.order.billingAddress}
                />
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
          <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
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
