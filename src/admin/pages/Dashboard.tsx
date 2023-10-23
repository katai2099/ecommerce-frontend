import { Grid, Paper } from "@mui/material";
import { OrderAnalyticComp } from "../components/OrderAnalyticComp";
import { RecentOrders } from "../components/RecentOrder";
import { SaleAnalyticComp } from "../components/SaleAnalytic";

export const Dashboard = () => {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={5}>
        <OrderAnalyticComp />
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: "350px",
          }}
        >
          <SaleAnalyticComp />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <RecentOrders />
      </Grid>
    </Grid>
  );
};
