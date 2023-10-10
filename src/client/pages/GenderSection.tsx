import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsAction } from "../../actions/productActions";
import { fetchProductSetttingsCategoriesAction } from "../../actions/productSettingsActions";
import { PageNumberSection } from "../../admin/components/PageNumberSection";
import { Gender, IProduct } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  setProductFilter,
  startNewFilter,
} from "../../reducers/productSettingsReducer";
import { useAppDispatch } from "../../store/configureStore";
import { CategoryHeader } from "../components/CategoryHeader";
import { FilterSection } from "../components/FilterSection";
import { MobileFilter } from "../components/MobileFilter";
import { ProductList } from "../components/ProductList";

export const GenderSection = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const filter = useSelector(
    (state: RootState) => state.productSettings.filter
  );
  const [page, setPage] = useState<number>(1);
  const [currentPageTotalItem, setCurrentPageTotalItem] = useState<number>(0);
  const [totalItem, SetTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { gender } = useParams();
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("md"));

  const updateFilter = (field: string, value: any) => {
    const updatedFilter = { ...filter, [field]: value };
    dispatch(setProductFilter(updatedFilter));
  };

  const getGender = (key: string | undefined): Gender | null => {
    if (!key) {
      return null;
    }
    const gender = key.toUpperCase() as unknown as Gender;
    return Gender[gender] || null;
  };

  useEffect(() => {
    const genderEnum = getGender(gender);
    if (genderEnum) {
      dispatch(startNewFilter({ key: "gender", value: [genderEnum] }));
    } else {
      //TODO: not found page
    }
  }, [gender]);

  useEffect(() => {
    dispatch(fetchProductSetttingsCategoriesAction());
  }, []);

  useEffect(() => {
    if (filter.gender.length > 0) {
      dispatch(getProductsAction(filter))
        .unwrap()
        .then((res) => {
          setFirstLoad(false);
          if (res.currentPage != 1) {
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
  ]);

  const handleLoadMoreClick = () => {
    const page = filter.page!;
    updateFilter("page", page + 1);
  };

  return (
    <Box minHeight="84vh" margin="80px auto 0">
      <Grid container sx={{ display: { sm: "none", xs: "none", md: "flex " } }}>
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
          sx={{ display: { sm: "none", xs: "none", md: "inline-block" } }}
        >
          <FilterSection />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={9.5}
          onClick={() => {
            console.log(matchMobile);
          }}
        >
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
