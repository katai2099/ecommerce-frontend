import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { CartProduct } from "../cart/CartProduct";
import { CartDetailProduct } from "../cart/CartDetailProduct";
import { OrderDetailProduct } from "./OrderDetailProduct";
import { CartMenuProps } from "../cart/CartMenu";

export const OrderDetail = ({ open, toggleDrawer }: CartMenuProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <Box sx={{ width: "max(530px)" }} role="presentation">
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Box overflow="auto" height="calc(100vh - 140px)" padding="30px">
            <Box mb="15px" position="relative">
              <Typography variant="h5" textAlign="center">
                View order details
              </Typography>
              <IconButton
                sx={{ position: "absolute", top: "-3px", right: "12px" }}
                onClick={() => {
                  toggleDrawer(false);
                }}
              >
                <CloseOutlined />
              </IconButton>
            </Box>
            <Divider />
            <Box mt="4px">
              <OrderDetailProduct />
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
