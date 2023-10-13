import { Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { CategoryFilter } from "./CategoryFilter";
import { GenderFilter } from "./GenderFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RatingFilter } from "./RatingFilter";
import { FilterSkeletonLoading } from "./SkeletonLoading";

export const FilterSection = () => {
  const isSearch = useSelector(
    (state: RootState) => state.productList.isSearch
  );
  const isTop = useSelector(
    (state: RootState) => state.productList.isTopCategory
  );
  const isCategoriesLoading = useSelector(
    (state: RootState) => state.productAttributes.categoriesLoading
  );
  return (
    <Paper sx={{ p: "32px" }}>
      {isCategoriesLoading ? (
        <FilterSkeletonLoading />
      ) : (
        <Stack spacing={4}>
          {(isSearch || isTop) && <GenderFilter />}
          {!isTop && <CategoryFilter />}
          <PriceRangeFilter />
          <RatingFilter />
        </Stack>
      )}
    </Paper>
  );
};
