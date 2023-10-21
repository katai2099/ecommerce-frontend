import { Edit, MoreVert, Visibility } from "@mui/icons-material";
import {
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
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  setProductFeatured,
  setProductPublish,
} from "../../../controllers/product";
import { clone, formatPrice, showSnackBar } from "../../../controllers/utils";
import {
  Filter,
  IProduct,
  IProductFilter,
  ProductMode,
} from "../../../model/product";
import { setProductMode } from "../../../reducers/productReducer";
import { useAppDispatch } from "../../../store/configureStore";

interface Data {
  createdAt: string;
  stock: number;
  featured: boolean;
  name: string;
  price: number;
  publish: string;
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
      <Typography>{date.toDateString()}</Typography>
      <Typography>{date.toLocaleTimeString()}</Typography>
    </Box>
  );
};

const StockColumn = ({ product }: ColumnProps) => {
  let sizeCount = 0;
  const total = product.productSizes.reduce((accumulator, currentValue) => {
    sizeCount++;
    return accumulator + currentValue.stockCount;
  }, 0);
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
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
    navigate("/product/create", {
      state: product.id,
    });
  };

  const handleProductEdit = () => {
    dispatch(setProductMode(ProductMode.EDIT));
    handleClose();
    navigate("/product/create", {
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
    id: "createdAt",

    label: "Create at",
  },
  {
    id: "stock",

    label: "Stock",
  },
  {
    id: "featured",
    label: "Featured",
  },
  {
    id: "price",

    label: "Price",
  },
  {
    id: "publish",

    label: "Publish",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding="normal">
            {headCell.label}
          </TableCell>
        ))}
        <TableCell size="small" />
      </TableRow>
    </TableHead>
  );
}

export const ProductTable = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<IProductFilter>(new Filter());
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  useEffect(() => {
    getProducts(filter)
      .then((data) => {
        setTotalPage(data.totalPage);
        setTotalItems(data.totalItem);
        setProducts(data.data);
      })
      .catch((err) => {});
  }, []);

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

  const handleProductFeaturedChange = (checked: boolean, index: number) => {
    const oldProducts = clone(products);
    const updatedProducts = products.map((product, idx) =>
      idx === index ? { ...product, featured: checked } : product
    );
    setProducts(updatedProducts);
    setProductFeatured(checked, products[index].id)
      .then(() => {})
      .catch((err) => {
        showSnackBar("something went wrong", "error");
        setProducts(oldProducts);
      });
  };

  const handleProductPublishChange = (checked: boolean, index: number) => {
    const oldProducts = clone(products);
    const updatedProducts = products.map((product, idx) =>
      idx === index ? { ...product, publish: checked } : product
    );
    setProducts(updatedProducts);
    setProductPublish(checked, products[index].id)
      .then(() => {})
      .catch((err) => {
        showSnackBar("something went wrong", "error");
        setProducts(oldProducts);
      });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
          <EnhancedTableHead />
          <TableBody>
            {products.map((product, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell align="left" component="th" scope="product">
                    <ProductColumn product={product} />
                  </TableCell>
                  <TableCell align="left">
                    <CreateAtColumn product={product} />
                  </TableCell>
                  <TableCell align="left">
                    <StockColumn product={product} />
                  </TableCell>
                  <TableCell align="left">
                    <Switch
                      checked={product.featured}
                      color="info"
                      onChange={(_, checked) => {
                        handleProductFeaturedChange(checked, index);
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h4">
                      {formatPrice(product.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Switch
                      checked={product.publish}
                      color="success"
                      onChange={(_, checked) => {
                        handleProductPublishChange(checked, index);
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <OptionColumn product={product} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={12}
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
