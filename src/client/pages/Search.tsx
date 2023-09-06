import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsAction } from "../../actions/productActions";
import { fetchProductSetttingsCategoriesAction } from "../../actions/productSettingsActions";
import { PageNumberSection } from "../../admin/components/PageNumberSection";
import { IProduct } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  setProductFilter,
  startNewFilter,
} from "../../reducers/productSettingsReducer";
import { useAppDispatch } from "../../store/configureStore";
import { FilterSection } from "../components/FilterSection";
import { ProductList } from "../components/ProductList";
import { CategoryHeader } from "../components/CategoryHeader";

export const Search = () => {
  const { q } = useParams();
  const dispatch = useAppDispatch();
  const filter = useSelector(
    (state: RootState) => state.productSettings.filter
  );
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [currentPageTotalItem, setCurrentPageTotalItem] = useState<number>(0);
  const [totalItem, SetTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    dispatch(startNewFilter({ key: "q", value: q }));
  }, [q]);

  useEffect(() => {
    dispatch(fetchProductSetttingsCategoriesAction());
  }, []);

  useEffect(() => {
    if (filter.q) {
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
    }
  }, [
    filter.page,
    filter.sort,
    filter.category,
    filter.pmax,
    filter.pmin,
    filter.rating,
    filter.gender,
    filter.q,
  ]);

  const updateFilter = (field: string, value: any) => {
    const updatedFilter = { ...filter, [field]: value };
    dispatch(setProductFilter(updatedFilter));
  };

  const handleLoadMoreClick = () => {
    const page = filter.page!;
    updateFilter("page", page + 1);
  };

  return (
    <Box minHeight="84vh" margin="80px auto 0">
      <CategoryHeader isSearch={true} totalItems={totalItem} />
      <Grid container>
        <Grid item md={2}>
          <FilterSection isSearch={true} />
        </Grid>
        <Grid item md={10}>
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
