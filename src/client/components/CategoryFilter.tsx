import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IIdName } from "../../model/common";
import { RootState } from "../../reducers/combineReducer";
import { setProductsFilter } from "../../reducers/productListReducer";
import { LgScreenProps } from "./MobileFilter";
import { FilterHeader } from "./common/FilterHeader";

export const CategoryFilter = ({ isLgScreen = true }: LgScreenProps) => {
  const isSearch = useSelector(
    (state: RootState) => state.productList.isSearch
  );
  const productAttributes = useSelector(
    (state: RootState) => state.productAttributes
  );
  const categories = productAttributes.categories;
  const filter = useSelector((state: RootState) => state.productList.filter);
  const displayCategories: IIdName[] = [{ id: 0, name: "All" }, ...categories];
  const dispatch = useDispatch();

  const updateSingleCategory = (event: SelectChangeEvent<string>) => {
    const newCategory = [event.target.value];
    updateFilter(newCategory);
  };
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newCategories = typeof value === "string" ? value.split(",") : value;
    updateFilter(newCategories);
  };

  const updateFilter = (newCategories: string[]) => {
    const newFilter = { ...filter, category: newCategories, page: 1 };
    dispatch(setProductsFilter(newFilter));
  };

  return (
    <Box>
      <FormControl fullWidth>
        {isLgScreen && <FilterHeader title="Category" />}
        <InputLabel></InputLabel>
        {isSearch ? (
          <Box position="relative" width="100%">
            <Box position="absolute" left="8%" top="30%">
              Select
            </Box>
            <Select
              fullWidth
              multiple
              value={filter.category}
              onChange={handleChange}
              renderValue={() => null}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  <Checkbox
                    checked={filter.category.indexOf(category.name) > -1}
                  />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : (
          <>
            {isLgScreen ? (
              <Select
                value={
                  filter.category && filter.category.length > 0
                    ? filter.category[0]
                    : displayCategories[0].name
                }
                onChange={updateSingleCategory}
                fullWidth
              >
                {displayCategories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <FormControl>
                <RadioGroup
                  name="sort"
                  value={
                    filter.category && filter.category.length > 0
                      ? filter.category[0]
                      : displayCategories[0].name
                  }
                >
                  {displayCategories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      value={category.name}
                      control={<Radio size="small" />}
                      label={category.name}
                      onChange={() => {
                        dispatch(
                          setProductsFilter({
                            ...filter,
                            category: [category.name],
                          })
                        );
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </>
        )}
      </FormControl>
    </Box>
  );
};
