import styled from "@emotion/styled";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { OrderSummaryItemProps } from "../../client/components/OrderSummaryItem";
import { getUserOrders } from "../../controllers/order";
import { formatPrice } from "../../controllers/utils";
import {
  IPaginationFilterData,
  PaginationFilterData,
} from "../../model/common";
import { IOrder } from "../../model/order";
import { PageNumberSection } from "./PageNumberSection";

const OrderAccordion = styled(Accordion)(({ theme }) => ({
  ...theme,
  padding: "8px 16px",
  margin: "1rem 0",
}));

interface OrderItemProps {
  order: IOrder;
}

const PurchasedItem = ({ orderSummary }: OrderSummaryItemProps) => {
  return (
    <Box display="flex" gap="24px" width="100%" alignItems="flex-start">
      <Box>
        <img
          style={{ objectFit: "contain" }}
          width="64px"
          height="64px"
          alt=""
          src={orderSummary.productImg}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold">{orderSummary.productName}</Typography>
        <Typography color="lightBlack">
          {`${formatPrice(orderSummary.priceAtPurchase)} * ${
            orderSummary.quantity
          }`}
        </Typography>
        <Typography color="GrayText" fontSize="12px">
          Size: {orderSummary.sizeLabel}
        </Typography>
      </Box>
    </Box>
  );
};

const OrderItem = ({ order }: OrderItemProps) => {
  const navigate = useNavigate();
  return (
    <OrderAccordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-label="Expand"
        aria-controls="-content"
        id="-header"
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
            <Chip
              label={order.status}
              color={
                order.status === "ORDER PLACED"
                  ? "info"
                  : order.status === "PROCESSING"
                  ? "primary"
                  : order.status === "OUT FOR DELIVERY"
                  ? "warning"
                  : "success"
              }
            />
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
        <Box display="flex" justifyContent="space-between">
          <Box>
            {order.orderDetails.map((orderSummary, idx) => (
              <PurchasedItem key={idx} orderSummary={orderSummary} />
            ))}
          </Box>
          <Box mr="24px" mb="12px" alignSelf="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigate(`/account/orders/${order.id}`);
              }}
            >
              See more details
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </OrderAccordion>
  );
};

export const OrderHistory = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [paginationFilterData, setPaginationFilterData] =
    useState<IPaginationFilterData>(new PaginationFilterData());
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filterPage, setFilterPage] = useState<number>(1);

  useEffect(() => {
    getUserOrders(filterPage)
      .then((res) => {
        setFirstLoad(false);
        if (res.currentPage !== 1) {
          setOrders((prev) => [...prev, ...res.data]);
        } else {
          setOrders(res.data);
        }
        const updatedPaginationData: IPaginationFilterData = {
          page: res.currentPage,
          totalPage: res.totalPage,
          totalItem: res.totalItem,
          currentPageTotalItem: res.data.length,
        };
        setPaginationFilterData(updatedPaginationData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterPage]);

  const handleLoadMoreClick = () => {
    setFilterPage((prev) => prev + 1);
  };

  return (
    <Paper sx={{ padding: "16px 32px 32px" }}>
      <Typography variant="h3" mb="24px">
        Orders
      </Typography>
      <Box display="flex" flexWrap="wrap" alignItems="center" padding="0 16px">
        <Typography className="flex-grow" fontSize="16px" fontWeight="bold">
          Order #
        </Typography>
        <Typography className="flex-grow" fontSize="16px" fontWeight="bold">
          Status
        </Typography>
        <Typography className="flex-grow" fontSize="16px" fontWeight="bold">
          Date purchased
        </Typography>
        <Typography className="flex-grow" fontSize="16px" fontWeight="bold">
          Total
        </Typography>
      </Box>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
      <PageNumberSection
        showbar={false}
        currentPageTotalItem={paginationFilterData.currentPageTotalItem}
        totalPage={paginationFilterData.totalPage}
        totalItem={paginationFilterData.totalItem}
        itemPerPage={20}
        page={filterPage}
        handleLoadMoreClick={handleLoadMoreClick}
        firstLoad={false}
      />
    </Paper>
  );
};
