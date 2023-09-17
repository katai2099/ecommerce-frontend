import styled from "@emotion/styled";
import { CloseOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../reducers/combineReducer";
import { CartSidebarItem } from "./CartSidebarItem";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface CartMenuProps {
  open: boolean;
  totalItems?: number;
  toggleDrawer: (open: boolean) => void;
}

export const CartMenu = ({ open, toggleDrawer, totalItems }: CartMenuProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.carts;
  const total = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.product.price * currentValue.quantity;
  }, 0);
  const isUpdate = cart.isUpdate;

  const navigate = useNavigate();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
      sx={{ position: "relative" }}
    >
      <Backdrop
        open={isUpdate}
        onClick={() => {}}
        sx={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ width: "max(400px)" }} role="presentation">
        <Box
          display="flex"
          flexDirection="column"
          overflow="hidden"
          height="100%"
        >
          <Box overflow="auto" height="85vh" padding="30px">
            <FlexBox mb="15px">
              <Box display="flex" alignItems="center" gap="8px">
                <ShoppingBagOutlined />
                <Typography variant="h3">
                  Shopping Bag ({totalItems})
                </Typography>
              </Box>
              <IconButton
                onClick={() => {
                  toggleDrawer(false);
                }}
              >
                <CloseOutlined />
              </IconButton>
            </FlexBox>
            <Divider />
            <Box mt="4px">
              {cartItems.map((cartItem, idx) => (
                <CartSidebarItem key={idx} cartItem={cartItem} index={idx} />
              ))}
            </Box>
            {cartItems.length === 0 && (
              <Box
                height="100%"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <ShoppingBagOutlined
                  sx={{ fontSize: "96px", color: "grayText", opacity: "0.7" }}
                />
                <Typography variant="h3" pb="8px">
                  Shopping bag is Empty!
                </Typography>
                <Typography color="GrayText">Start shopping</Typography>
              </Box>
            )}
          </Box>
          {cartItems.length > 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="15vh"
              padding="0 32px"
              gap="12px"
            >
              <Button fullWidth variant="contained">
                Checkout Now &nbsp;($
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
                )
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  toggleDrawer(false);
                  navigate("/cart");
                }}
              >
                View Cart
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
