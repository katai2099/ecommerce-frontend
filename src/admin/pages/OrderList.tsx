import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderDetails } from "../../controllers/order";
import { IOrderDetail, IOrderFilter } from "../../model/order";
import { OrderTable } from "../components/order/OrderTable";

export const OrderList = () => {
  const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([]);
  const [orderFilter, setOrderFilter] = useState<IOrderFilter>({});
  useEffect(() => {
    getOrderDetails(orderFilter)
      .then((res) => {
        if (res.currentPage === 1) {
          setOrderDetails(res.data);
        } else {
          setOrderDetails((prev) => [...prev, ...res.data]);
        }
      })
      .catch((err) => {});
  }, [orderFilter.page, orderFilter.status]);
  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Box>
          <Typography variant="h3">List</Typography>
        </Box>
        <OrderTable orderDetails={orderDetails} />
      </Paper>
    </Box>
  );
};
