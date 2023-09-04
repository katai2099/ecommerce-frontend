import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { AppBox } from "../../styles/common";
import { CartProduct } from "../components/cart/CartProduct";
import { CartDetailProduct } from "../components/cart/CartDetailProduct";

export const Cart = () => {
  return (
    <AppBox>
      <Typography pt="32px" textAlign="center" variant="h3" fontWeight="bold">
        Shopping bag
      </Typography>
      <Grid container mt="32px" gap="32px">
        <Grid item md={7}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            <CartDetailProduct />
            <CartDetailProduct />
            <CartDetailProduct />
            <CartDetailProduct />
            <CartDetailProduct />
            <CartDetailProduct />
            <CartDetailProduct />
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper sx={{ width: "100%", padding: "32px" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="32px"
            >
              <Typography>Total</Typography>
              <Typography>$460.00</Typography>
            </Box>
            <Divider />
            <Button fullWidth sx={{ mt: "32px" }} variant="contained">
              Proceed To Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </AppBox>
  );
};
