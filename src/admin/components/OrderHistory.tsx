import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderItem } from "../../client/components/OrderItem";
import { OrdersSkeletonLoading } from "../../client/components/SkeletonLoading";
import { getUserOrders } from "../../controllers/order";
import {
  IPaginationFilterData,
  PaginationFilterData,
} from "../../model/common";
import { RootState } from "../../reducers/combineReducer";
import { PageNumberSection } from "./PageNumberSection";

export const OrderHistory = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [paginationFilterData, setPaginationFilterData] =
    useState<IPaginationFilterData>(new PaginationFilterData());
  const accountData = useSelector((state: RootState) => state.account);
  const orders = accountData.orders;
  const ordersLoading = accountData.orderLoading;
  const [filterPage, setFilterPage] = useState<number>(1);

  useEffect(() => {
    getUserOrders(filterPage)
      .then((res) => {
        setFirstLoad(false);
        const updatedPaginationData: IPaginationFilterData = {
          page: res.currentPage,
          totalPage: res.totalPage,
          totalItem: res.totalItem,
          currentPageTotalItem: res.data.length,
        };
        setPaginationFilterData(updatedPaginationData);
      })
      .catch((err) => {});
  }, [filterPage]);

  const handleLoadMoreClick = () => {
    setFilterPage((prev) => prev + 1);
  };

  return (
    <Paper sx={{ padding: { xs: "16px 0px 32px", sm: "16px 32px 32px" } }}>
      <Typography variant="h3" mb="24px">
        Orders
      </Typography>
      {firstLoad && ordersLoading && (
        <Box width="100%">
          <OrdersSkeletonLoading amount={10} />
        </Box>
      )}
      {!firstLoad && !ordersLoading && orders.length > 0 && (
        <>
          <Box
            sx={{ display: { xs: "none", sm: "flex" } }}
            flexWrap="wrap"
            alignItems="center"
            padding="0 16px"
          >
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
            firstLoad={firstLoad}
            itemsLoading={ordersLoading}
          />
        </>
      )}

      {!firstLoad && !ordersLoading && orders.length === 0 && (
        <Box>
          <Typography variant="h2" mt="36px">
            No orders for this account
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
