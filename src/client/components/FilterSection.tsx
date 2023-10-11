import { Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { CategoryFilter } from "./CategoryFilter";
import { GenderFilter } from "./GenderFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RatingFilter } from "./RatingFilter";

export const FilterSection = () => {
  const isSearch = useSelector(
    (state: RootState) => state.productList.isSearch
  );
  return (
    <Paper sx={{ p: "32px" }}>
      <Stack spacing={4}>
        {isSearch && <GenderFilter />}
        <CategoryFilter />
        <PriceRangeFilter />
        <RatingFilter />
      </Stack>
    </Paper>
  );
};
