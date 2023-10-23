import { Box, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { OrderDetailComp } from "../../client/components/OrderDetailComp";
import { fetchAdminSettings } from "../../controllers/product";
import { setLoading } from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";
import { theme } from "../../styles/theme";
import { AdminDrawerComp } from "../components/AdminDrawerComp";
import { Category } from "./Category";
import { CategoryList } from "./CategoryList";
import { Dashboard } from "./Dashboard";
import { OrderList } from "./OrderList";
import { Product } from "./Product";
import { ProductList } from "./ProductList";
import { SizeList } from "./SizeList";

export const Admin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    fetchAdminSettings()
      .catch((err) => {})
      .finally(() => dispatch(setLoading(false)));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AdminDrawerComp />
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.grey[100],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/create" element={<Product />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/category/create" element={<Category />} />
            <Route path="/size" element={<SizeList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetailComp />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};
