import { ExpandMore } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Typography,
  colors,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../controllers/utils";
import { IOrder } from "../../model/order";
import { OrderAccordion } from "../../styles/common";
import { OrderSummaryItemProps } from "./OrderSummaryItem";

interface OrderItemProps {
  order: IOrder;
}

interface OrderStatusChipProps {
  status: string;
}

export const OrderStatusChip = ({ status }: OrderStatusChipProps) => {
  return (
    <Chip
      label={status}
      color={
        status === "ORDER PLACED"
          ? "info"
          : status === "PROCESSING"
          ? "primary"
          : status === "OUT FOR DELIVERY"
          ? "warning"
          : "success"
      }
      sx={{
        ...(status === "PROCESSING" && {
          bgcolor: "#B2AA8F",
        }),
      }}
    />
  );
};

export const OrderItem = ({ order }: OrderItemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <OrderAccordion variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ ...(matchSm && { padding: 0 }) }}
      >
        <Box display="flex" alignItems="center" flexWrap="wrap" width="100%">
          <Typography
            className="flex-grow"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {order.id}
          </Typography>
          <Box className="flex-grow">
            <OrderStatusChip status={order.status} />
          </Box>
          <Typography className="flex-grow">
            {new Date(order.orderDate).toDateString()}
          </Typography>
          <Typography className="flex-grow">
            {formatPrice(order.totalPrice)}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box width={matchSm ? "100%" : "90%"}>
            {order.orderDetails.map((orderSummary, idx) => (
              <PurchasedItem key={idx} orderSummary={orderSummary} />
            ))}
          </Box>
          <Box
            sx={{
              mr: { xs: "0px", sm: "24px" },
              mb: { xs: "0px", sm: "12px" },
              mt: "8px",
            }}
            alignSelf="flex-end"
            width={matchSm ? "100%" : "auto"}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigate(`/account/orders/${order.id}`);
              }}
              fullWidth={matchSm}
            >
              See more details
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </OrderAccordion>
  );
};

const PurchasedItem = ({ orderSummary }: OrderSummaryItemProps) => {
  return (
    <Box
      display="flex"
      width="100%"
      sx={{
        gap: { xs: "8px", sm: "24px" },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box>
        <img
          style={{ objectFit: "contain" }}
          width="64px"
          height="64px"
          alt=""
          src={orderSummary.productImg}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        flexWrap="wrap"
        sx={{
          alignItems: { xs: "center", sm: "flex-start" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box className="flex-grow">
          <Typography fontWeight="bold">{orderSummary.productName}</Typography>
          <Box display="flex" alignItems="center" gap="4px">
            <Typography color={colors.grey[800]}>
              {formatPrice(orderSummary.priceAtPurchase)}
            </Typography>
            <Typography
              color="GrayText"
              fontSize="12px"
              sx={{ display: { xs: "block", sm: "none" } }}
            >{`(x${orderSummary.quantity})`}</Typography>
          </Box>
        </Box>
        <Typography color="GrayText" fontSize="12px" className="flex-grow">
          Size: {orderSummary.sizeLabel}
        </Typography>
        <Typography
          color="GrayText"
          fontSize="12px"
          className="flex-grow"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Qty: {orderSummary.quantity}
        </Typography>
      </Box>
    </Box>
  );
};
