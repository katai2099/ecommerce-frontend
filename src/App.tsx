import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Box, Container } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import { Footer } from "./components/footer/Footer";
import { Product } from "./pages/Product";
import { Navbar } from "./components/navbar/Navbar";
import { Category } from "./pages/Category";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Account } from "./pages/Account";

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
