import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductsAction } from "../../actions/productActions";
import { fetchProductSetttingsCategoriesAction } from "../../actions/productSettingsActions";
import { PageNumberSection } from "../../admin/components/PageNumberSection";
import { IProduct } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import { setProductFilter } from "../../reducers/productSettingsReducer";
import { useAppDispatch } from "../../store/configureStore";
import { CategoryHeader } from "../components/CategoryHeader";
import { FilterSection } from "../components/FilterSection";
import { ProductList } from "../components/ProductList";

export const Category = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const filter = useSelector(
    (state: RootState) => state.productSettings.productFilter
  );
  const [page, setPage] = useState<number>(1);
  const [currentPageTotalItem, setCurrentPageTotalItem] = useState<number>(0);
  const [totalItem, SetTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const dispatch = useAppDispatch();

  const updateFilter = (field: string, value: any) => {
    const updatedFilter = { ...filter, [field]: value };
    dispatch(setProductFilter(updatedFilter));
  };

  useEffect(() => {
    dispatch(fetchProductSetttingsCategoriesAction());
  }, []);

  useEffect(() => {
    dispatch(getProductsAction(filter))
      .unwrap()
      .then((res) => {
        setFirstLoad(false);
        if (filter.page != 1) {
          setProducts((prev) => [...prev, ...res.data]);
        } else {
          setProducts(res.data);
        }
        setPage(res.currentPage);
        setTotalPage(res.totalPage);
        SetTotalItem(res.totalItem);
        setCurrentPageTotalItem(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    filter.page,
    filter.sort,
    filter.category,
    filter.pmax,
    filter.pmin,
    filter.rating,
    filter.gender,
  ]);

  const handleLoadMoreClick = () => {
    const page = filter.page!;
    updateFilter("page", page + 1);
  };

  return (
    <Box minHeight="84vh" margin="80px auto 0">
      <CategoryHeader />
      <Grid container>
        <Grid item xs={0} md={2}>
          <FilterSection />
        </Grid>
        <Grid item xs={12} md={10}>
          <ProductList
            products={products}
            firstLoad={firstLoad}
            totalItem={totalItem}
          />
          <PageNumberSection
            currentPageTotalItem={currentPageTotalItem}
            totalPage={totalPage}
            totalItem={totalItem}
            page={page}
            handleLoadMoreClick={handleLoadMoreClick}
            firstLoad={firstLoad}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
