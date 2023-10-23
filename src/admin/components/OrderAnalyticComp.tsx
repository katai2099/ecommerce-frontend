import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderAnalytic } from "../../controllers/order";
import { formatPrice } from "../../controllers/utils";
import { IOrderAnalytic, OrderAnalytic } from "../../model/order";
import CardAnalytic from "./CardAnalytic";

export const AnalyticPaper = styled(Paper)(({ theme }) => ({
  ...theme,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  height: 150,
}));

export const OrderAnalyticComp = () => {
  const [orderAnalytic, setOrderAnalytic] = useState<IOrderAnalytic>(
    new OrderAnalytic()
  );
  const convertedDate = new Date(orderAnalytic.oldestOrderDate);
  const today = new Date();
  useEffect(() => {
    getOrderAnalytic()
      .then((res) => setOrderAnalytic(res))
      .catch((err) => {});
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <AnalyticPaper>
          <CardAnalytic
            title="Total Sales"
            number={formatPrice(orderAnalytic.totalSales)}
            date={`since ${convertedDate.toDateString()}`}
          />
        </AnalyticPaper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <AnalyticPaper>
          <CardAnalytic
            title="Total Orders"
            number={orderAnalytic.totalOrders.toString()}
            date={`since ${convertedDate.toDateString()}`}
          />
        </AnalyticPaper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <AnalyticPaper>
          <CardAnalytic
            title="Today Sales"
            number={formatPrice(orderAnalytic.todaySales)}
            date={`on ${today.toDateString()}`}
          />
        </AnalyticPaper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <AnalyticPaper>
          <CardAnalytic
            title="Today Orders"
            number={orderAnalytic.todayOrders.toString()}
            date={`on ${today.toDateString()}`}
          />
        </AnalyticPaper>
      </Grid>
    </Grid>
  );
};
