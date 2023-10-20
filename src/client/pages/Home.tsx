import { useEffect } from "react";
import {
  getFeaturedProductsAction,
  getTopCategoriesAction,
} from "../../actions/productActions";
import { getCart } from "../../controllers/cart";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { ECarousel } from "../components/ECarousel";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Promote } from "../components/Promote";
import { TopCategories } from "../components/TopCategories";
import { Subscribe } from "../components/homepage/subscribe/Subscribe";

export const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getCart();
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
