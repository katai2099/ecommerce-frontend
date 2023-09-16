import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography, styled } from "@mui/material";
import { ICartItem } from "../../../model/cart";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/configureStore";
import { setOpen } from "../../../reducers/cartReducer";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface CartItemProps {
  cartItem: ICartItem;
}

export const CartItem = ({ cartItem }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleItemClick = () => {
    dispatch(setOpen(false));
  };

  return (
    <Box
      p="8px 0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box flex="1 1 40%">
        <img
          width="120px"
          height="140px"
          alt=""
          src={cartItem.product.images[0].imageUrl}
        />
      </Box>
      <Box flex="1 1 60%">
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
          <IconButton>
            <CloseOutlined />
          </IconButton>
        </FlexBox>
        <Typography fontWeight="bold">{`$ ${cartItem.product.price.toFixed(
          2
        )}`}</Typography>
        <Typography color="GrayText">{`Size: ${cartItem.product.productSizes[0].size.name}`}</Typography>
        <FlexBox m="15px 0">
          <Box display="flex" alignItems="center">
            <IconButton>
              <Remove />
            </IconButton>
            <Typography>{cartItem.quantity}</Typography>
            <IconButton>
              <Add />
            </IconButton>
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
};