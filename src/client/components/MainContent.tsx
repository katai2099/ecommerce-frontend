import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  setMbGenderMenuOpen,
  setMbSearchBarOpen,
} from "../../reducers/guiReducer";
import { Account } from "../pages/Account";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { GenderSection } from "../pages/GenderSection";
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
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchBigNav = useMediaQuery(theme.breakpoints.up("bigNav"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (matchSm) {
      dispatch(setMbGenderMenuOpen(false));
    }
  }, [matchSm]);
  useEffect(() => {
    if (matchBigNav) {
      dispatch(setMbSearchBarOpen(false));
    }
  }, [matchBigNav]);
  return (
    <Box>
      <Navbar />
      <LoadingBackDrop />
      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: { xs: "0", md: "16px" },
          paddingRight: { xs: "0", md: "16px" },
        }}
      >
        <AppSnackbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetail />}>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="" element={<ProductDetail />} />
          </Route>
          <Route path="/search" element={<Search />} />

          <Route path="/:gender" element={<GenderSection />} />
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
