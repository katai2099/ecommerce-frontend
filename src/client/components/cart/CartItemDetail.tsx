import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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

  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p="0px 0 24px">
      <Box display="flex" gap="24px" width="100%" alignItems="flex-start">
        <Link to={`/products/${cartItem.product.id}`}>
          <Box>
            <img
              width={matchSm ? "80px" : "120px"}
              height={matchSm ? "80px" : "120px"}
              alt=""
              src={
                cartItem.product.images.length > 0
                  ? cartItem.product.images[0].imageUrl
                  : ""
              }
            />
          </Box>
        </Link>
        <Box sx={{ width: { xs: "100%", sm: "80%" } }}>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box width="100%">
                <Box display="flex" justifyContent="space-between">
                  <Link
                    to={`/products/${cartItem.product.id}`}
                    className="nav-item"
                  >
                    <Typography fontSize="16px" color="primary">
                      {cartItem.product.name}
                    </Typography>
                  </Link>
                  <IconButton
                    onClick={handleRemoveCartItem}
                    sx={{ paddingTop: 0 }}
                  >
                    <CloseOutlined />
                  </IconButton>
                </Box>
                <Typography color="GrayText">
                  {formatPrice(cartItem.product.price)}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="GrayText">
                    Size: {cartItem.product.productSizes[0].size.name}
                  </Typography>
                  <Box mr="8px">
                    <Typography fontWeight="bold">
                      {formatPrice(cartItem.quantity * cartItem.product.price)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
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
          </Box>
          <Box
            m="8px 0"
            sx={{ display: { xs: "none", sm: "flex" } }}
            justifyContent="space-between"
            alignItems="center"
          >
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
          </Box>
        </Box>
      </Box>
      <Box
        mt="4px"
        sx={{ display: { xs: "flex", sm: "none" } }}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap="12px"
        paddingRight="8px"
      >
        <Button
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
