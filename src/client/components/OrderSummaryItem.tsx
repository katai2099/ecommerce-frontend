import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { formatPrice } from "../../controllers/utils";
import { IOrderSummary } from "../../model/order";

export interface OrderSummaryItemProps {
  orderSummary: IOrderSummary;
}

export const OrderSummaryItem = ({ orderSummary }: OrderSummaryItemProps) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box p="0px 0 24px">
      <Box
        display="flex"
        gap="24px"
        width="100%"
        alignItems={matchSm ? "center" : "flex-start"}
        flexDirection={matchSm ? "column" : "row"}
      >
        <Box>
          <img
            width={matchSm ? "80px" : "96px"}
            height={matchSm ? "80px" : "96px"}
            alt=""
            src={orderSummary.productImg}
          />
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="16px"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {orderSummary.productName}
            </Typography>
            <Typography color="GrayText">
              {formatPrice(orderSummary.priceAtPurchase)}
            </Typography>

            <Typography color="GrayText">
              Size: {orderSummary.sizeLabel}
            </Typography>
            <Typography>Qty: {orderSummary.quantity}</Typography>
          </Box>
          <Box alignSelf={matchSm ? "flex-end" : "flex-start"} display="flex">
            <Typography>Total: </Typography>
            <Typography fontWeight="bold">
              &nbsp;
              {formatPrice(
                orderSummary.priceAtPurchase * orderSummary.quantity
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
