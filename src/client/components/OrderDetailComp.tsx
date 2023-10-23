import { Circle } from "@mui/icons-material";
import {
  Box,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrderDetail, updateOrderStatus } from "../../controllers/order";
import { IOrderHistory } from "../../model/order";
import { Role } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
import { OrderReview } from "./OrderReview";
import { OrderStatusProgress } from "./OrderStatusProgress";

export const OrderDetailComp = () => {
  const { id } = useParams();
  const orderDetail = useSelector(
    (state: RootState) => state.account.selectedOrder
  );
  const isAdmin = useSelector(
    (state: RootState) => state.user.role === Role.ADMIN
  );
  useEffect(() => {
    getOrderDetail(id!)
      .then((res) => {})
      .catch((err) => {});
  }, []);
  const handleStatusUpdate = (status: string) => {
    updateOrderStatus(orderDetail.order.id, status)
      .then(() => {})
      .catch(() => {});
  };
  return (
    <Box display="flex" flexDirection="column" gap="32px">
      <OrderStatusProgress
        isAdmin={isAdmin}
        status={orderDetail.order.status}
        onStatusUpdate={handleStatusUpdate}
      />
      <OrderReview orderDetail={orderDetail} />
      {isAdmin && (
        <OrderStatusHistory orderHistories={orderDetail.orderHistories} />
      )}
    </Box>
  );
};

interface OrderStatusHistoryProps {
  orderHistories: IOrderHistory[];
}

const OrderStatusHistory = ({ orderHistories }: OrderStatusHistoryProps) => {
  const reverseHistories = [...orderHistories].reverse();

  return (
    <Paper sx={{ padding: "16px 32px 32px" }}>
      <Typography variant="h3" fontWeight="bold" mb="20px">
        History
      </Typography>
      <Box>
        <Stepper orientation="vertical">
          {reverseHistories.map((orderHistory, idx) => {
            const date = new Date(orderHistory.actionTime);
            return (
              <Step key={idx} expanded>
                <StepLabel
                  sx={{ fontWeight: "bold" }}
                  StepIconProps={{
                    icon: <Circle color={idx === 0 ? "primary" : "disabled"} />,
                  }}
                >
                  {orderHistory.status}
                </StepLabel>
                <StepContent>
                  <Box display="flex" gap="16px" color="GrayText">
                    <Typography fontSize="14px">
                      {date.toDateString()}
                    </Typography>
                    <Typography fontSize="14px">
                      {date.toLocaleTimeString()}
                    </Typography>
                  </Box>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Paper>
  );
};
