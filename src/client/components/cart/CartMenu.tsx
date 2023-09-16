import styled from "@emotion/styled";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/combineReducer";
import { CartItem } from "./CartItem";

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
  const cartItems = useSelector((state: RootState) => state.cart.carts);
  const total = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.product.price * currentValue.quantity;
  }, 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <Box sx={{ width: "max(400px)" }} role="presentation">
        <Box
          // height="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Box overflow="auto" height="calc(100vh - 140px)" padding="30px">
            <FlexBox mb="15px">
              <Typography variant="h3">Shopping Bag ({totalItems})</Typography>
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
                <CartItem key={idx} cartItem={cartItem} />
              ))}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Button>Checkout Now (${total.toFixed(2)})</Button>
            <Button>View Cart</Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
