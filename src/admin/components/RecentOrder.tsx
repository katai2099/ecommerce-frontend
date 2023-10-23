import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecentOrders } from "../../controllers/order";
import { IOrderDetail } from "../../model/order";
import Title from "./Title";
import { OrderTable } from "./order/OrderTable";

export const RecentOrders = () => {
  const [recentOrderDetails, setRecentOrderDetails] = useState<IOrderDetail[]>(
    []
  );
  useEffect(() => {
    getRecentOrders()
      .then((res) => setRecentOrderDetails(res))
      .catch(() => {});
  }, []);
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Title>Recent Orders</Title>
      {recentOrderDetails.length > 0 ? (
        <>
          <OrderTable orderDetails={recentOrderDetails} />
          <Box mt={3}>
            <Link to="/orders" color="primary">
              See more orders
            </Link>
          </Box>
        </>
      ) : (
        <Typography variant="h2">No recent orders</Typography>
      )}
    </Paper>
  );
};
