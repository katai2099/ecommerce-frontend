import {
  Accordion,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { AppBox } from "../styles/common";
import { OrderDetail } from "../components/order/OrderDetail";
import { useState } from "react";

export const Checkout = () => {
  const [openOrderDetailDrawer, setOpenOrderDetailDrawer] =
    useState<boolean>(false);
  const handleToggleOrderDetailDrawer = (open: boolean) => {
    setOpenOrderDetailDrawer(open);
  };

  return (
    <AppBox>
      <Typography pt="32px" textAlign="center" variant="h3" fontWeight="bold">
        Checkout
      </Typography>
      <Grid container mt="32px" gap="32px">
        <Grid item md={8}>
          <Paper>
            <Box>
              {/* <Accordion></Accordion> */}
              <Typography>My information</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box>
              <Typography>Billing Address</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box>
              <Typography>Shipping Address</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box>
              <Typography>Payment Details</Typography>
              <Button>Place Order</Button>
            </Box>
          </Paper>
          <Box>
            <Typography>View order details 4 items</Typography>
            <Grid
              container
              onClick={() => {
                handleToggleOrderDetailDrawer(true);
              }}
            >
              <Grid item md={4}>
                <img
                  alt=""
                  src="https://lp2.hm.com/hmgoepprod?set=source[/c8/0b/c80b4c77270f065e00e02f6513cab2f85eb2a861.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[q],hmver[2]&call=url[file:/product/miniature]"
                />
              </Grid>
              <Grid item md={4}>
                <img
                  alt=""
                  src="https://lp2.hm.com/hmgoepprod?set=source[/c8/0b/c80b4c77270f065e00e02f6513cab2f85eb2a861.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[q],hmver[2]&call=url[file:/product/miniature]"
                />
              </Grid>
              <Grid item md={4}>
                <img
                  alt=""
                  src="https://lp2.hm.com/hmgoepprod?set=source[/c8/0b/c80b4c77270f065e00e02f6513cab2f85eb2a861.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[q],hmver[2]&call=url[file:/product/miniature]"
                />
              </Grid>
              <Grid item md={4}>
                <img
                  alt=""
                  src="https://lp2.hm.com/hmgoepprod?set=source[/c8/0b/c80b4c77270f065e00e02f6513cab2f85eb2a861.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[q],hmver[2]&call=url[file:/product/miniature]"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Paper>
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal:</Typography>
                <Typography>$2,611.00</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Shipping</Typography>
                <Typography>-</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Tax</Typography>
                <Typography>-</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Discount</Typography>
                <Typography>-</Typography>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography>$2,611.00</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <OrderDetail
        open={openOrderDetailDrawer}
        toggleDrawer={handleToggleOrderDetailDrawer}
      />
    </AppBox>
  );
};
