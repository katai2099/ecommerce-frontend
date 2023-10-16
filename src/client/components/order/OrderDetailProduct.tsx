import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { formatPrice } from "../../../controllers/utils";
import { ICartItem } from "../../../model/cart";

interface OrderDetailProductProps {
  cartItem: ICartItem;
}

export const OrderDetailProduct = ({ cartItem }: OrderDetailProductProps) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <Box display="flex" gap="24px" width="100%">
        <Box>
          <img
            style={{ objectFit: "contain" }}
            width={matchSm ? "80px" : "96px"}
            height={matchSm ? "80px" : "96px"}
            alt=""
            src={cartItem.product.images[0].imageUrl}
          />
        </Box>
        <Box width="70%">
          <Typography fontWeight="bold" fontSize="16px">
            {cartItem.product.name}
          </Typography>
          <Typography color="GrayText">
            {formatPrice(cartItem.product.price)}
          </Typography>

          <Typography color="GrayText">
            Size: {cartItem.product.productSizes[0].size.name}
          </Typography>
          <Typography>Qty: {cartItem.quantity}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
