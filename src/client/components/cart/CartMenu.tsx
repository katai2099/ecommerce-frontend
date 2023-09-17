import styled from "@emotion/styled";
import { CloseOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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
                <CartItem key={idx} cartItem={cartItem} />
              ))}
            </Box>
          </Box>
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
        </Box>
      </Box>
    </Drawer>
  );
};
