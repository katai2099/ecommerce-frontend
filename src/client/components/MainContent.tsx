import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Account } from "../pages/Account";
import { Cart } from "../pages/Cart";
import { Category } from "../pages/Category";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/Home";
import { OrderFailure } from "../pages/OrderFailure";
import { OrderSuccess } from "../pages/OrderSuccess";
import { ProductDetail } from "../pages/ProductDetail";
import { Search } from "../pages/Search";
import { AppSnackbar } from "./AppSnackbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoadingBackDrop } from "./common/LoadingBackDrop";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

export const MainContent = () => {
  return (
    <Box>
      <Navbar />
      <LoadingBackDrop />
      <Container maxWidth="xl">
        <AppSnackbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetail />}>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="" element={<ProductDetail />} />
          </Route>
          <Route path="/search" element={<Search />} />

          <Route path="/:gender" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={<ProtectedRoute element={<Checkout />} />}
          />
          <Route
            path="/account/*"
            element={<ProtectedRoute element={<Account />} />}
          />
          <Route path="/orders/complete" element={<OrderSuccess />} />
          <Route path="/orders/failure" element={<OrderFailure />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};
