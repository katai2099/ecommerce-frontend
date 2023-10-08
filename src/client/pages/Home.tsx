import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getFeaturedProductsAction,
  getTopCategoriesAction,
} from "../../actions/productActions";
import { getCart } from "../../controllers/cart";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { ECarousel } from "../components/ECarousel";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Promote } from "../components/Promote";
import { TopCategories } from "../components/TopCategories";
import { Subscribe } from "../components/homepage/subscribe/Subscribe";

export const Home = () => {
  const login = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (login) {
      getCart();
    }
    dispatch(getFeaturedProductsAction());
    dispatch(getTopCategoriesAction());
  }, []);

  return (
    <AppBox>
      <ECarousel />
      <Promote />
      <TopCategories />
      <FeaturedProducts />
      <Subscribe />
    </AppBox>
  );
};
