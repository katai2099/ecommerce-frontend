import { Box, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchAdminSettingsAction } from "../../actions/adminActions";
import { useAppDispatch } from "../../store/configureStore";
import { theme } from "../../styles/theme";
import { AdminDrawerComp } from "../components/AdminDrawerComp";
import { Dashboard } from "./Dashboard";
import { Product } from "./Product";
import { ProductList } from "./ProductList";

export const Admin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAdminSettingsAction());
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
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};
