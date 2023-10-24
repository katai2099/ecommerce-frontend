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
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
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
import { AdminMode } from "../../../model/admin";
import { ADMIN_ITEM_PER_PAGE } from "../../../model/constant";
import {
  Filter,
  IProduct,
  IProductFilter,
  productTableHeadCells,
} from "../../../model/product";
import {
  setEditedProduct,
  setProductMode,
  setSelectedProduct,
} from "../../../reducers/productReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { EnhancedTableHead } from "../../style/common";

interface ColumnProps {
  product: IProduct;
}

const ProductColumn = ({ product }: ColumnProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Box mr="16px" borderRadius="8px" width="64px" height="64px">
        <img
          alt=""
          src={product.images.length > 0 ? product.images[0].imageUrl : ""}
          className="img-contain"
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography>{product.name}</Typography>
        <Typography>{product.category.name}</Typography>
      </Box>
    </Box>
  );
};

interface CreateAtColomnProps {
  createdAt: string;
}

export const CreateAtColumn = ({ createdAt }: CreateAtColomnProps) => {
  const date = new Date(createdAt);
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

  const handleProductMenuSelect = (mode: AdminMode) => {
    dispatch(setProductMode(mode));
    dispatch(setSelectedProduct(product));
    dispatch(setEditedProduct(product));
    handleClose();
    navigate("/product/create");
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
        <MenuItem
          onClick={() => {
            handleProductMenuSelect(AdminMode.VIEW);
          }}
        >
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProductMenuSelect(AdminMode.EDIT);
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const ProductTable = () => {
  const [tablePage, setPage] = useState(0);
  const [filter, setFilter] = useState<IProductFilter>(new Filter());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  useEffect(() => {
    const adminFilter: IProductFilter = {
      ...filter,
      itemperpage: ADMIN_ITEM_PER_PAGE,
      sort: undefined,
    };
    getProducts(adminFilter)
      .then((data) => {
        if (data.currentPage === 1) {
          setProducts(data.data);
          setTotalPage(data.totalPage);
          setTotalItems(data.totalItem);
        } else {
          setProducts((prev) => [...prev, ...data.data]);
        }
      })
      .catch((err) => {});
  }, [filter.page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    const currentElements = (newPage + 1) * rowsPerPage;
    const currentFilterPage = filter.page ? filter.page : 1;
    const lastTwentyElements = currentFilterPage * ADMIN_ITEM_PER_PAGE - 20;
    if (
      currentElements >= lastTwentyElements &&
      currentFilterPage !== totalPage
    ) {
      setFilter({ ...filter, page: currentFilterPage + 1 });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const visibleRows = React.useMemo(
    () =>
      products.slice(
        tablePage * rowsPerPage,
        tablePage * rowsPerPage + rowsPerPage
      ),
    [tablePage, rowsPerPage, products]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <EnhancedTableHead headCells={productTableHeadCells} />
          <TableBody>
            {visibleRows.map((product, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell align="left" component="th" scope="product">
                    <ProductColumn product={product} />
                  </TableCell>
                  <TableCell align="left">
                    <CreateAtColumn createdAt={product.createdAt} />
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
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={tablePage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
