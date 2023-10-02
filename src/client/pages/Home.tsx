import { useEffect } from "react";
import { getCartAction } from "../../actions/cartActions";
import { setLoading } from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { ShoppingList } from "../components/homepage/productList/ShoppingList";
import { Subscribe } from "../components/homepage/subscribe/Subscribe";

export const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getCartAction()).finally(() => dispatch(setLoading(false)));
  }, []);
  return (
    <AppBox>
      <ShoppingList />
      <Subscribe />
    </AppBox>
  );
};
