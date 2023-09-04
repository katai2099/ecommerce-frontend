import { Container, Typography } from "@mui/material";
import { Navbar } from "../components/navbar/Navbar";
import { ShoppingList } from "../components/homepage/productList/ShoppingList";
import { Subscribe } from "../components/homepage/subscribe/Subscribe";
import { Footer } from "../components/footer/Footer";
import { AppBox } from "../../styles/common";

export const Home = () => {
  return (
    <AppBox>
      <ShoppingList />
      <Subscribe />
    </AppBox>
  );
};
