import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartAction } from "../../../actions/cartActions";
import { formatPrice } from "../../../controllers/utils";
import {
  setIsUpdate,
  setOpen,
  updateCarts,
} from "../../../reducers/cartReducer";
import { RootState } from "../../../reducers/combineReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { CartItemDetailProps } from "./CartItemDetail";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartSidebarItem = ({
  cartItem,
  index,
  stockCheck,
}: CartItemDetailProps) => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = () => {
    dispatch(setIsUpdate(true));
    dispatch(updateCartAction({ quantity: 0, cartItemId: cartItem.id }))
      .unwrap()
      .then(() => {
        const updatedCarts = carts.filter((_, idx) => idx !== index);
        dispatch(updateCarts(updatedCarts));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsUpdate(false));
      });
  };

  const handleUpdateCartItemQuantity = (quantityChange: number) => {
    const quantity = cartItem.quantity + quantityChange;
    dispatch(setIsUpdate(true));
    dispatch(updateCartAction({ quantity, cartItemId: cartItem.id }))
      .then(() => {
        const updatedCarts = carts.map((cartItem, idx) =>
          idx === index ? { ...cartItem, quantity: quantity } : cartItem
        );
        dispatch(updateCarts(updatedCarts));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsUpdate(false));
      });
  };

  const handleItemClick = () => {
    dispatch(setOpen(false));
  };

  const badStockIndex = stockCheck.findIndex(
    (item) => item.cartItemId === cartItem.id
  );

  return (
    <Box
      p="8px 0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to={`/products/${cartItem.product.id}`} onClick={handleItemClick}>
        <Box flex="1 1 40%">
          <img
            width="120px"
            height="140px"
            alt=""
            src={cartItem.product.images[0].imageUrl}
          />
        </Box>
      </Link>
      <Box flex="1 1 60%" ml="12px">
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
          <IconButton onClick={handleRemoveCartItem}>
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
        <FlexBox m="15px 0">
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
              onClick={() => {
                handleUpdateCartItemQuantity(1);
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
};
