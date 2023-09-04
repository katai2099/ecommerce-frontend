import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./client/pages/SignUp";
import { Home } from "./client/pages/Home";
import { Box, Container } from "@mui/material";
import { SignIn } from "./client/pages/SignIn";
import { Footer } from "./client/components/footer/Footer";
import { Product } from "./client/pages/Product";
import { Navbar } from "./client/components/navbar/Navbar";
import { Category } from "./client/pages/Category";
import { Cart } from "./client/pages/Cart";
import { Checkout } from "./client/pages/Checkout";
import { Account } from "./client/pages/Account";

function App() {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
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
