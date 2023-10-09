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
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stockCheck } from "../../../controllers/cart";
import { formatPrice, showSnackBar } from "../../../controllers/utils";
import { IStockCountCheck } from "../../../model/cart";
import { OUT_OF_STOCK_MESSAGE } from "../../../model/constant";
import { RootState } from "../../../reducers/combineReducer";
import { LoadingButton } from "../common/LoadingButton";
import { CartSidebarItem } from "./CartSidebarItem";

const FlexBox = styled(Box)(({ theme }) => ({
  ...theme,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export interface CartSidebarProps {
  open: boolean;
  totalItems?: number;
  toggleDrawer: (open: boolean) => void;
}

export const CartSidebar = ({
  open,
  toggleDrawer,
  totalItems,
}: CartSidebarProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.carts;
  const total = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.product.price * currentValue.quantity;
  }, 0);
  const isUpdate = cart.isUpdate;
  const [checkStock, setCheckStock] = useState<boolean>(false);
  const [stockCheckResponse, setStockCheckResponse] = useState<
    IStockCountCheck[]
  >([]);

  const navigate = useNavigate();

  function handleProceedClick(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    setCheckStock(true);
    stockCheck()
      .then((res) => {
        setStockCheckResponse(res);
        if (res.length === 0) {
          toggleDrawer(false);
          navigate("/checkout");
        } else {
          showSnackBar(OUT_OF_STOCK_MESSAGE);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setCheckStock(false));
  }

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
                <CartSidebarItem
                  key={idx}
                  cartItem={cartItem}
                  index={idx}
                  stockCheck={stockCheckResponse}
                />
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
              </Box>
            )}
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
            {cartItems.length > 0 && (
              <LoadingButton
                title={`Checkout Now ${formatPrice(total)}`}
                fullWidth={true}
                onClick={handleProceedClick}
                loading={checkStock}
              />
            )}

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
