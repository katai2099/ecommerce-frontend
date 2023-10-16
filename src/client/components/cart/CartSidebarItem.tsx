import styled from "@emotion/styled";
import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemFromCart, updateCart } from "../../../controllers/cart";
import { formatPrice } from "../../../controllers/utils";
import { setOpen } from "../../../reducers/cartReducer";
import { RootState } from "../../../reducers/combineReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { CartItemDetailProps } from "./CartItemDetail";

const FlexBox = styled(Box)(({ theme }) => ({
  ...theme,
  display: "flex",
  justifyContent: "space-between",
}));
export const CartSidebarItem = ({
  cartItem,
  index,
  stockCheck,
}: CartItemDetailProps) => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useAppDispatch();
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRemoveCartItem = () => {
    removeItemFromCart(cartItem.id, carts, index, true);
  };

  const handleTooltipOpen = () => {
    if (
      cartItem.product.productSizes[0]?.stockCount &&
      cartItem.quantity === cartItem.product.productSizes[0].stockCount
    ) {
      setIsTooltipOpen(true);
    }
  };

  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
  };

  const handleUpdateCartItemQuantity = (quantityChange: number) => {
    updateCart(
      cartItem.quantity + quantityChange,
      cartItem.id,
      carts,
      index,
      true
    );
  };

  const handleItemClick = () => {
    dispatch(setOpen(false));
  };

  const badStockIndex = stockCheck.findIndex(
    (item) => item.cartItemId === cartItem.id
  );

  return (
    <Box padding="8px 0">
      <Box display="flex" justifyContent="space-between">
        <Link to={`/products/${cartItem.product.id}`} onClick={handleItemClick}>
          <Box flex="1 1 40%">
            <img
              width={matchSm ? "80px" : "120px"}
              height={matchSm ? "80px" : "120px"}
              alt=""
              src={cartItem.product.images[0].imageUrl}
            />
          </Box>
        </Link>
        <Box flex="1 1 60%" ml="12px">
          <Box>
            <FlexBox>
              <Link
                to={`/products/${cartItem.product.id}`}
                className="nav-item"
                onClick={handleItemClick}
              >
                <Typography fontSize="16px" color="primary">
                  {cartItem.product.name}
                </Typography>
              </Link>
              <IconButton sx={{ paddingTop: 0 }} onClick={handleRemoveCartItem}>
                <CloseOutlined />
              </IconButton>
            </FlexBox>
            <Typography fontWeight="bold">
              {formatPrice(cartItem.product.price)}
            </Typography>
            <Typography color="GrayText">{`Size: ${cartItem.product.productSizes[0].size.name}`}</Typography>
            {badStockIndex !== -1 && (
              <Box>
                <Typography fontSize="12px" color="error">
                  {stockCheck[badStockIndex].stockCount === 0
                    ? "Product out of stock"
                    : `only ${stockCheck[badStockIndex].stockCount} items remained`}
                </Typography>
              </Box>
            )}
          </Box>
          <FlexBox m="8px 0" sx={{ display: { xs: "none", sm: "flex" } }}>
            <Box display="flex" alignItems="center">
              <IconButton
                sx={{ pl: 0 }}
                disabled={cartItem.quantity === 1}
                color="primary"
                onClick={() => {
                  handleUpdateCartItemQuantity(-1);
                }}
              >
                <Remove />
              </IconButton>
              <Typography>{cartItem.quantity}</Typography>
              <Tooltip
                title="Quantity is not available"
                placement="top"
                open={isTooltipOpen}
                onOpen={handleTooltipOpen}
                onClose={handleTooltipClose}
              >
                <span>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleUpdateCartItemQuantity(1);
                    }}
                    disabled={
                      cartItem.product.productSizes[0]?.stockCount
                        ? cartItem.quantity ===
                          cartItem.product.productSizes[0].stockCount
                        : false
                    }
                  >
                    <Add />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </FlexBox>
        </Box>
      </Box>
      <Box
        padding="0px 8px"
        sx={{ display: { xs: "flex", sm: "none" } }}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap="12px"
      >
        <Button
          size="small"
          fullWidth
          variant="outlined"
          disabled={cartItem.quantity === 1}
          onClick={() => {
            handleUpdateCartItemQuantity(-1);
          }}
        >
          <Remove />
        </Button>

        <Typography
          border="1px solid lightGray"
          padding="4px 8px"
          borderRadius="4px"
        >
          {cartItem.quantity}
        </Typography>
        <Button
          size="small"
          fullWidth
          variant="outlined"
          disabled={
            cartItem.product.productSizes[0]?.stockCount
              ? cartItem.quantity ===
                cartItem.product.productSizes[0].stockCount
              : false
          }
          onClick={() => {
            handleUpdateCartItemQuantity(1);
          }}
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
};
