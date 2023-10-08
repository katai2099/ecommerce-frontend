import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../controllers/cart";
import { RootState } from "../../reducers/combineReducer";
import { AppBox } from "../../styles/common";
import { ShoppingList } from "../components/homepage/productList/ShoppingList";
import { Subscribe } from "../components/homepage/subscribe/Subscribe";

export const Home = () => {
  const login = useSelector((state: RootState) => state.user.loggedIn);
  useEffect(() => {
    if (login) {
      getCart();
    }
  }, []);
  return (
    <AppBox>
      <ShoppingList />
      <Subscribe />
    </AppBox>
  );
};
