import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { LoadingBackDrop } from "./client/components/common/LoadingBackDrop";
import { Footer } from "./client/components/footer/Footer";
import { Navbar } from "./client/components/navbar/Navbar";
import { Account } from "./client/pages/Account";
import { Cart } from "./client/pages/Cart";
import { Category } from "./client/pages/Category";
import { Checkout } from "./client/pages/Checkout";
import { Home } from "./client/pages/Home";
import { ProductDetail } from "./client/pages/ProductDetail";
import { SignIn } from "./client/pages/SignIn";
import { SignUp } from "./client/pages/SignUp";
import { Search } from "./client/pages/Search";

function App() {
  return (
    <Box>
      <Navbar />
      <LoadingBackDrop />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/search">
            <Route path="/search/:q" element={<Search />} />
            <Route path="" element={<Search />} />
          </Route>
          <Route path="/:gender" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
