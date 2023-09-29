import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Account } from "../pages/Account";
import { Cart } from "../pages/Cart";
import { Category } from "../pages/Category";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/Home";
import { OrderSuccess } from "../pages/OrderSuccess";
import { ProductDetail } from "../pages/ProductDetail";
import { Search } from "../pages/Search";
import { LoadingBackDrop } from "./common/LoadingBackDrop";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

export const MainContent = () => {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getCartAction());
  // }, []);
  return (
    <Box>
      <Navbar />
      <LoadingBackDrop />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetail />}>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="" element={<ProductDetail />} />
          </Route>
          <Route path="/search">
            <Route path="/search/:q" element={<Search />} />
            <Route path="" element={<Search />} />
          </Route>
          <Route path="/:gender" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/orders/complete" element={<OrderSuccess />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};
