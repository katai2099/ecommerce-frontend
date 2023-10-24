import { Box, CircularProgress, Paper, Typography } from "@mui/material";
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
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  useEffect(() => {
    getRecentOrders()
      .then((res) => setRecentOrderDetails(res))
      .catch(() => {})
      .finally(() => setFirstLoad(false));
  }, []);
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Title>Recent Orders</Title>
      {firstLoad && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {recentOrderDetails.length > 0 && !firstLoad && (
        <>
          <OrderTable orderDetails={recentOrderDetails} recentOrders={true} />
          <Box mt={3}>
            <Link to="/orders" color="primary">
              See more orders
            </Link>
          </Box>
        </>
      )}
      {recentOrderDetails.length === 0 && !firstLoad && (
        <Typography variant="h2">No recent orders</Typography>
      )}
    </Paper>
  );
};
