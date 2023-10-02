import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemFromCart, updateCart } from "../../../controllers/cart";
import { formatPrice } from "../../../controllers/utils";
import { ICartItem, IStockCountCheck } from "../../../model/cart";
import { RootState } from "../../../reducers/combineReducer";

export interface CartItemDetailProps {
  cartItem: ICartItem;
  index: number;
  stockCheck: IStockCountCheck[];
}

export const CartItemDetail = ({
  cartItem,
  index,
  stockCheck,
}: CartItemDetailProps) => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const handleRemoveCartItem = () => {
    removeItemFromCart(cartItem.id, carts, index);
  };

  const handleUpdateCartItemQuantity = (quantityChange: number) => {
    updateCart(cartItem.quantity + quantityChange, cartItem.id, carts, index);
  };

  const badStockIndex = stockCheck.findIndex(
    (item) => item.cartItemId === cartItem.id
  );

  return (
    <Box p="0px 0 24px" display="flex" justifyContent="space-between">
      <Box display="flex" gap="24px" width="100%" alignItems="center">
        <Link to={`/products/${cartItem.product.id}`}>
          <Box>
            <img
              width="120px"
              height="140px"
              alt=""
              src={cartItem.product.images[0].imageUrl}
            />
          </Box>
        </Link>
        <Box width="70%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link to={`/products/${cartItem.product.id}`} className="nav-item">
              <Typography fontSize="16px" color="primary">
                {cartItem.product.name}
              </Typography>
            </Link>
            <IconButton onClick={handleRemoveCartItem}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Typography color="GrayText">
            {formatPrice(cartItem.product.price)}
          </Typography>
          <Box>
            <Typography color="GrayText">
              Size: {cartItem.product.productSizes[0].size.name}
            </Typography>
          </Box>
          {badStockIndex !== -1 && (
            <Box>
              <Typography fontSize="12px" color="error">
                {stockCheck[badStockIndex].stockCount === 0
                  ? "Product out of stock"
                  : `only ${stockCheck[badStockIndex].stockCount} items remained`}
              </Typography>
            </Box>
          )}
          <Box
            m="15px 0"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <IconButton
                disabled={cartItem.quantity === 1}
                color="primary"
                onClick={() => {
                  handleUpdateCartItemQuantity(-1);
                }}
              >
                <Remove />
              </IconButton>
              <Typography>{cartItem.quantity}</Typography>
              <IconButton
                color="primary"
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
              </IconButton>
            </Box>
            <Box mr="8px">
              <Typography>
                Total: &nbsp;
                <b>{formatPrice(cartItem.quantity * cartItem.product.price)}</b>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
