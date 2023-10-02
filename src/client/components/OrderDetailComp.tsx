import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOrderDetail } from "../../controllers/order";
import { IOrderDetail, OrderDetail } from "../../model/order";
import { OrderReview } from "./OrderReview";
import { OrderStatusProgress } from "./OrderStatusProgress";

export const OrderDetailComp = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>(
    new OrderDetail()
  );
  useEffect(() => {
    console.log(id);
    getOrderDetail(id!)
      .then((res) => {
        setOrderDetail(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box display="flex" flexDirection="column" gap="32px">
      <OrderStatusProgress status={orderDetail.order.status} />
      <OrderReview orderDetail={orderDetail} />
    </Box>
  );
};
