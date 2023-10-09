import { Star } from "@mui/icons-material";
import {
  Box,
  Chip,
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
    <Paper sx={{ mt: "12px", mb: "24px" }}>
      <Box padding="12px 36px 20px 36px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <Box display="flex" gap="8px">
          {(isSearch || isTopCategory) && (
            <>
              {!!(filter.gender && filter.gender.length > 0) &&
                filter.gender.map((sex, idx) => (
                  <Chip
                    key={sex}
                    label={sex}
                    onDelete={() => {
                      const updatedGender = filter.gender.filter(
                        (_, index) => idx !== index
                      );
                      dispatch(
                        setProductFilter({ ...filter, gender: updatedGender })
                      );
                    }}
                  />
                ))}
              {!!(filter.category.length > 0) &&
                filter.category.map((cat, idx) => (
                  <Chip
                    key={cat}
                    label={cat}
                    onDelete={() => {
                      const updatedCategories = filter.category.filter(
                        (_, index) => idx !== index
                      );
                      dispatch(
                        setProductFilter({
                          ...filter,
                          category: updatedCategories,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
          {!!(
            filter.pmin !== undefined &&
            filter.pmax &&
            (filter.pmin !== 0 || filter.pmax !== 100)
          ) && (
            <Chip
              label={`${filter.pmin} - ${filter.pmax} $`}
              onDelete={() => {
                dispatch(setProductFilter({ ...filter, pmin: 0, pmax: 100 }));
              }}
            />
          )}
          {!!(filter.rating !== undefined && filter.rating !== 0) && (
            <Chip
              label={`${filter.rating}`}
              icon={<Star fontSize="small" color="warning" />}
              onDelete={() => {
                dispatch(setProductFilter({ ...filter, rating: 0 }));
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};
