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

export const CategoryHeader = () => {
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
        <Typography variant="h5">
          {filter.category.length > 0 ? filter.category[0] : "All"}
        </Typography>
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
