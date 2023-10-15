import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrderDetail } from "../../controllers/order";
import { RootState } from "../../reducers/combineReducer";
import { OrderReview } from "./OrderReview";
import { OrderStatusProgress } from "./OrderStatusProgress";

export const OrderDetailComp = () => {
  const { id } = useParams();
  const orderDetail = useSelector(
    (state: RootState) => state.account.selectedOrder
  );
  useEffect(() => {
    getOrderDetail(id!)
      .then((res) => {})
      .catch((err) => {});
  }, []);
  return (
    <Box display="flex" flexDirection="column" gap="32px">
      <OrderStatusProgress status={orderDetail.order.status} />
      <OrderReview orderDetail={orderDetail} />
    </Box>
  );
};
