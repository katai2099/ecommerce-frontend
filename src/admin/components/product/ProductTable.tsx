import { Edit, MoreVert, Visibility } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IProduct, ProductMode } from "../../../model/product";
import { useAppDispatch } from "../../../store/configureStore";
import { setProductMode } from "../../../reducers/productReducer";

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface ProductTableProps {
  products: IProduct[];
}

interface ColumnProps {
  product: IProduct;
}

const ProductColumn = ({ product }: ColumnProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Box mr="16px" borderRadius="8px">
        <img
          alt=""
          src={product.images[0].imageUrl}
          // src="https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_11.jpg"
          width="64px"
          height="64px"
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography>{product.name}</Typography>
        <Typography>{product.category.name}</Typography>
      </Box>
    </Box>
  );
};

const CreateAtColumn = ({ product }: ColumnProps) => {
  const date = new Date(product.createdAt);
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      {/* 27 Aug 2023
      7:08 PM */}
      <Typography>{date.toDateString()}</Typography>
      <Typography>{date.toLocaleTimeString()}</Typography>
    </Box>
  );
};

const StockColumn = ({ product }: ColumnProps) => {
  // const total = product.productSizes.map((prod)=>prod.stockCount)
  let sizeCount = 0;
  const total = product.productSizes.reduce((accumulator, currentValue) => {
    sizeCount++;
    return accumulator + currentValue.stockCount;
  }, 0);
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      {/* <LinearProgress value={70} color="success" variant="determinate" /> */}
      <Typography mt="4px" textAlign="center">
        {total} in stock in {sizeCount} variants
      </Typography>
    </Box>
  );
};

const OptionColumn = ({ product }: ColumnProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProductView = () => {
    dispatch(setProductMode(ProductMode.VIEW));
    handleClose();
    navigate("/admin/product/create", {
      state: product.id,
    });
  };

  const handleProductEdit = () => {
    dispatch(setProductMode(ProductMode.EDIT));
    handleClose();
    navigate("/admin/product/create", {
      state: product.id,
    });
  };

  return (
    <div>
      <IconButton id="long-button" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: -100 }}
      >
        <MenuItem onClick={handleProductView}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleProductEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",

    label: "Product",
  },
  {
    id: "calories",

    label: "Create at",
  },
  {
    id: "fat",

    label: "Stock",
  },
  {
    id: "carbs",

    label: "Price",
  },
  {
    id: "protein",

    label: "Publish",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell size="small" />
      </TableRow>
    </TableHead>
  );
}

export const ProductTable = ({ products }: ProductTableProps) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {products.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    align="left"
                    component="th"
                    id={labelId}
                    scope="row"
                  >
                    <ProductColumn product={row} />
                  </TableCell>
                  <TableCell align="left">
                    <CreateAtColumn product={row} />
                  </TableCell>
                  <TableCell align="left">
                    <StockColumn product={row} />
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h4">
                      ${Number(row.price).toPrecision(4)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      label={row.publish ? "Published" : "Drafted"}
                      color={row.publish ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <OptionColumn product={row} />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
