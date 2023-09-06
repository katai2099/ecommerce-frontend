import { AppBox } from "../../styles/common";
import { ShoppingList } from "../components/homepage/productList/ShoppingList";
import { Subscribe } from "../components/homepage/subscribe/Subscribe";

export const Home = () => {
  return (
    <AppBox>
      <ShoppingList />
      <Subscribe />
    </AppBox>
  );
};
