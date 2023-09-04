import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsLoad } from "../../actions/productActions";
import { IProduct, ProductMode } from "../../model/product";
import { useAppDispatch } from "../../store/configureStore";
import { ProductTable } from "../components/product/ProductTable";
import { setProductMode } from "../../reducers/productReducer";

export const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(productsLoad())
      .unwrap()
      .then((data) => {
        setTotalPage(data.totalPage);
        setTotalItems(data.totalItem);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="24px"
        >
          <Typography variant="h3">List</Typography>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setProductMode(ProductMode.CREATE));
              navigate("/admin/product/create");
              console.log(products);
            }}
          >
            <Add />
            New Product
          </Button>
        </Box>
        <ProductTable products={products} />
      </Paper>
    </Box>
  );
};
