import { Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { OrderStatusChip } from "../../../client/components/OrderItem";
import { formatPrice } from "../../../controllers/utils";
import { IOrderDetail, orderTableHeadCells } from "../../../model/order";
import { EnhancedTableHead } from "../../style/common";
import { CreateAtColumn } from "../product/ProductTable";

interface OrderTableProps {
  orderDetails: IOrderDetail[];
  recentOrders?: boolean;
}

export const OrderTable = ({
  orderDetails,
  recentOrders = false,
}: OrderTableProps) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <EnhancedTableHead headCells={orderTableHeadCells} />
          <TableBody>
            {orderDetails.map((orderDetail, index) => (
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
                {!recentOrders && (
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
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
