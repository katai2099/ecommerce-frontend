import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartAction } from "../../../actions/cartActions";
import { ICartItem } from "../../../model/cart";
import { updateCarts } from "../../../reducers/cartReducer";
import { RootState } from "../../../reducers/combineReducer";
import { setLoading } from "../../../reducers/guiReducer";
import { useAppDispatch } from "../../../store/configureStore";

export interface CartItemDetailProps {
  cartItem: ICartItem;
  index: number;
}

export const CartItemDetail = ({ cartItem, index }: CartItemDetailProps) => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = () => {
    dispatch(setLoading(true));
    dispatch(updateCartAction({ quantity: 0, cartItemId: cartItem.id }))
      .unwrap()
      .then(() => {
        const updatedCarts = carts.filter((_, idx) => idx !== index);
        dispatch(updateCarts(updatedCarts));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleUpdateCartItemQuantity = (quantityChange: number) => {
    const quantity = cartItem.quantity + quantityChange;
    dispatch(setLoading(true));
    dispatch(updateCartAction({ quantity, cartItemId: cartItem.id }))
      .unwrap()
      .then(() => {
        const updatedCarts = carts.map((cartItem, idx) =>
          idx === index ? { ...cartItem, quantity: quantity } : cartItem
        );
        dispatch(updateCarts(updatedCarts));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <Box
      p="0px 0 24px"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box display="flex" gap="24px" width="100%">
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
          <Typography color="GrayText">{`$${cartItem.product.price.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
            }
          )}`}</Typography>
          <Box>
            <Typography color="GrayText">
              Size: {cartItem.product.productSizes[0].size.name}
            </Typography>
          </Box>
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
                <b>
                  $
                  {(cartItem.quantity * cartItem.product.price).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </b>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
