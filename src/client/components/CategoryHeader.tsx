import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { productSort, productSortName } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import { setProductFilter } from "../../reducers/productSettingsReducer";
import { useAppDispatch } from "../../store/configureStore";
import { FilterSectionProps } from "./FilterSection";

interface SearchProps {
  totalItems?: number;
  isTopCategory?: boolean;
}

export const CategoryHeader = ({
  isSearch = false,
  totalItems = 0,
  isTopCategory = false,
}: FilterSectionProps & SearchProps) => {
  const filter = useSelector(
    (state: RootState) => state.productSettings.filter
  );
  const dispatch = useAppDispatch();

  const sortChangeHandler = (event: SelectChangeEvent<string>) => {
    const updatedFilter = { ...filter, sort: event.target.value, page: 1 };
    dispatch(setProductFilter(updatedFilter));
  };

  return (
    <Paper sx={{ mb: "48px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="12px 36px"
      >
        {isSearch || isTopCategory ? (
          <Box>
            <Typography variant="h3">
              Searching for "{isTopCategory ? filter.category[0] : filter.q}"
            </Typography>
            <Typography variant="h4" fontWeight="300">
              {totalItems} results found
            </Typography>
          </Box>
        ) : (
          <Typography variant="h5">
            {filter.category.length > 0 ? filter.category[0] : "All"}
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
    </Paper>
  );
};
