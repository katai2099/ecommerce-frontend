import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProductAttributesCategoriesAction } from "../../actions/productSettingsActions";
import { PageNumberSection } from "../../admin/components/PageNumberSection";
import { getProducts } from "../../controllers/product";
import { RootState } from "../../reducers/combineReducer";
import {
  setProductsFilter,
  startNewFilter,
} from "../../reducers/productListReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { CategoryHeader } from "../components/CategoryHeader";
import { FilterSection } from "../components/FilterSection";
import { MobileFilter } from "../components/MobileFilter";
import { ProductList } from "../components/ProductList";
import { ProductListSkeletonLoading } from "../components/SkeletonLoading";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Search = () => {
  const dispatch = useAppDispatch();

  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [currentPageTotalItem, setCurrentPageTotalItem] = useState<number>(0);
  const [totalItem, SetTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const productList = useSelector((state: RootState) => state.productList);
  const filter = productList.filter;
  const loading = productList.isLoading;
  const products = productList.products;

  let query = useQuery();

  const q = query.get("q");
  const category = query.get("category");
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (category && category !== "") {
      dispatch(startNewFilter({ key: "category", value: [category] }));
    }
  }, [category]);

  useEffect(() => {
    if (q && q !== "") {
      dispatch(startNewFilter({ key: "q", value: q }));
    }
  }, [q]);

  useEffect(() => {
    dispatch(fetchProductAttributesCategoriesAction());
  }, []);

  useEffect(() => {
    if (filter.category.length > 0 && filter.category[0] !== "") {
      if (filter.page && filter.page === 1) {
        setFirstLoad(true);
      }
      getProducts(filter)
        .then((res) => {
          setPage(res.currentPage);
          setTotalPage(res.totalPage);
          SetTotalItem(res.totalItem);
          setCurrentPageTotalItem(res.data.length);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setFirstLoad(false);
        });
    }
  }, [
    filter.page,
    filter.sort,
    filter.pmax,
    filter.pmin,
    filter.rating,
    filter.gender,
  ]);

  useEffect(() => {
    if (filter.q) {
      if (filter.page && filter.page === 1) {
        setFirstLoad(true);
      }
      getProducts(filter)
        .then((res) => {
          setPage(res.currentPage);
          setTotalPage(res.totalPage);
          SetTotalItem(res.totalItem);
          setCurrentPageTotalItem(res.data.length);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setFirstLoad(false);
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
    dispatch(setProductsFilter(updatedFilter));
  };

  const handleLoadMoreClick = () => {
    const page = filter.page!;
    updateFilter("page", page + 1);
  };

  return (
    <AppBox>
      <Grid container sx={{ display: { xs: "none", md: "flex " } }}>
        <Grid item md={3} lg={2.5}></Grid>
        <Grid item md={9} lg={9.5}>
          <CategoryHeader />
        </Grid>
      </Grid>
      {matchMobile && <MobileFilter />}
      <Grid container spacing={2}>
        <Grid
          item
          md={3}
          lg={2.5}
          sx={{ display: { xs: "none", md: "inline-block" } }}
        >
          <FilterSection />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9.5}>
          <ProductList
            error={error}
            products={products}
            firstLoad={firstLoad}
            totalItem={totalItem}
          />
          <PageNumberSection
            error={error}
            currentPageTotalItem={currentPageTotalItem}
            totalPage={totalPage}
            totalItem={totalItem}
            itemPerPage={20}
            page={page}
            itemName="products"
            handleLoadMoreClick={handleLoadMoreClick}
            firstLoad={firstLoad}
            itemsLoading={loading}
          >
            <ProductListSkeletonLoading amount={4} />
          </PageNumberSection>
        </Grid>
      </Grid>
    </AppBox>
  );
};
