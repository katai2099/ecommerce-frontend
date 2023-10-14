import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { productSort, productSortName } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import { setProductsFilter } from "../../reducers/productListReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppliedFilterChips } from "./AppliedFilterChips";

export const CategoryHeader = () => {
  const productList = useSelector((state: RootState) => state.productList);
  const filter = productList.filter;
  const isSearch = productList.isSearch;
  const isTopCategory = productList.isTopCategory;
  const loading = productList.isLoading;
  const dispatch = useAppDispatch();
  const totalItems = productList.totalItems;

  const sortChangeHandler = (event: SelectChangeEvent<string>) => {
    const updatedFilter = { ...filter, sort: event.target.value, page: 1 };
    dispatch(setProductsFilter(updatedFilter));
  };

  return (
    <Paper sx={{ mt: "12px", mb: "24px" }}>
      <Box padding="12px 36px 20px 36px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {isSearch || isTopCategory ? (
            <Box>
              <Typography variant="h3">
                Searching for "{isTopCategory ? filter.category[0] : filter.q}"
              </Typography>
              <Typography variant="h4" fontWeight="300">
                {loading ? <Skeleton /> : `${totalItems} results found`}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h5">
              {filter.category.length > 0 ? filter.category[0] : "All"} FOR{" "}
              {filter.gender}
            </Typography>
          )}
          <Box display="flex" alignItems="center" gap="8px">
            <Typography>Sort by:</Typography>
            <FormControl>
              <InputLabel></InputLabel>
              <Select value={filter.sort} onChange={sortChangeHandler}>
                {productSort.map((sort, idx) => (
                  <MenuItem key={sort} value={sort}>
                    {productSortName[idx]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <AppliedFilterChips />
      </Box>
    </Paper>
  );
};
