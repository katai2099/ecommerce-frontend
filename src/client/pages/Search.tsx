import { Box, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
import { CategoryHeader } from "../components/CategoryHeader";
import { FilterSection } from "../components/FilterSection";
import { ProductList } from "../components/ProductList";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Search = () => {
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

  let query = useQuery();

  const q = query.get("q");
  const category = query.get("category");

  useEffect(() => {
    if (category && category !== "") {
      dispatch(startNewFilter({ key: "category", value: [category] }));
    }
  }, []);

  useEffect(() => {
    if (q && q !== "") {
      dispatch(startNewFilter({ key: "q", value: q }));
    }
  }, [q]);

  useEffect(() => {
    dispatch(fetchProductSetttingsCategoriesAction());
  }, []);

  useEffect(() => {
    if (filter.q || filter.category.length > 0) {
      dispatch(getProductsAction(filter))
        .unwrap()
        .then((res) => {
          setFirstLoad(false);
          if (filter.page !== 1) {
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
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <CategoryHeader
            isSearch={!!q}
            totalItems={totalItem}
            isTopCategory={!!category}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
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
            itemPerPage={20}
            page={page}
            itemName="products"
            handleLoadMoreClick={handleLoadMoreClick}
            firstLoad={firstLoad}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
