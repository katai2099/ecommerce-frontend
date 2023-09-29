import { Box, Typography } from "@mui/material";
import { formatPrice } from "../../controllers/utils";
import { IOrderSummary } from "../../model/order";

interface OrderSummaryItemProps {
  orderSummary: IOrderSummary;
}

export const OrderSummaryItem = ({ orderSummary }: OrderSummaryItemProps) => {
  return (
    <Box
      p="0px 0 24px"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box display="flex" gap="24px" width="100%">
        <Box>
          <img
            width="96px"
            height="96px"
            alt=""
            src={orderSummary.productImg}
          />
        </Box>
        <Box width="70%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="bold" fontSize="16px">
              {orderSummary.productName}
            </Typography>
            <Typography>
              {`Total: ${formatPrice(
                orderSummary.priceAtPurchase * orderSummary.quantity
              )}`}
            </Typography>
          </Box>
          <Typography color="GrayText">
            {formatPrice(orderSummary.priceAtPurchase)}
          </Typography>

          <Typography color="GrayText">
            Size: {orderSummary.sizeLabel}
          </Typography>
          <Typography>Qty: {orderSummary.quantity}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
