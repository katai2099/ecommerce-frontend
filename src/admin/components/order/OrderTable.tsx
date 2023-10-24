import { Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrderStatusChip } from "../../../client/components/OrderItem";
import { formatPrice } from "../../../controllers/utils";
import { ADMIN_ITEM_PER_PAGE } from "../../../model/constant";
import { IOrderDetail, orderTableHeadCells } from "../../../model/order";
import { EnhancedTableHead } from "../../style/common";
import { CreateAtColumn } from "../product/ProductTable";

interface OrderTableProps {
  orderDetails: IOrderDetail[];
  recentOrders?: boolean;
  totalPage?: number;
  totalItems?: number;
  filterPage?: number;
  updateFilterPage?: (page: number) => void;
}

export const OrderTable = ({
  orderDetails,
  recentOrders = false,
  totalPage = 0,
  totalItems = 0,
  filterPage = 1,
  updateFilterPage,
}: OrderTableProps) => {
  const navigate = useNavigate();
  const [tablePage, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    const currentElements = (newPage + 1) * rowsPerPage;
    const currentFilterPage = filterPage;
    const lastTwentyElements = currentFilterPage * ADMIN_ITEM_PER_PAGE - 20;
    if (
      currentElements >= lastTwentyElements &&
      currentFilterPage !== totalPage
    ) {
      if (updateFilterPage) {
        updateFilterPage(currentFilterPage + 1);
      }
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      orderDetails.slice(
        tablePage * rowsPerPage,
        tablePage * rowsPerPage + rowsPerPage
      ),
    [tablePage, rowsPerPage, orderDetails]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <EnhancedTableHead headCells={orderTableHeadCells} />
          <TableBody>
            {(recentOrders ? orderDetails : visibleRows).map((orderDetail) => (
              <TableRow hover tabIndex={-1} key={orderDetail.order.id}>
                <TableCell align="left" component="th">
                  <Link to={`/orders/${orderDetail.order.id}`}>
                    <Typography>
                      {orderDetail.order.id.substring(0, 4)}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Typography>{`${orderDetail.user.firstname} ${orderDetail.user.lastname}`}</Typography>
                </TableCell>
                <TableCell align="left">
                  <CreateAtColumn createdAt={orderDetail.order.orderDate} />
                </TableCell>
                <TableCell align="left">
                  <OrderStatusChip status={orderDetail.order.status} />
                </TableCell>
                <TableCell align="left">
                  <Typography>
                    {orderDetail.order.orderDetails.reduce(
                      (accumulator, current) => current.quantity + accumulator,
                      0
                    )}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>
                    {formatPrice(orderDetail.order.totalPrice)}
                  </Typography>
                </TableCell>

                <TableCell size="small">
                  <Button
                    startIcon={<Visibility />}
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      navigate(`/orders/${orderDetail.order.id}`);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!recentOrders && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={tablePage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};
