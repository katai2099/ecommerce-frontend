import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IIdName } from "../../model/common";
import { RootState } from "../../reducers/combineReducer";
import { setProductFilter } from "../../reducers/productSettingsReducer";
import { FilterSectionProps } from "./FilterSection";
import { FilterHeader } from "./common/FilterHeader";

export const CategoryFilter = ({ isSearch = false }: FilterSectionProps) => {
  const productSettings = useSelector(
    (state: RootState) => state.productSettings
  );
  const categories = productSettings.categories;
  const filter = productSettings.productFilter;
  const displayCategories: IIdName[] = [{ id: 0, name: "All" }, ...categories];
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState<string[]>([]);

  const updateCategory = (event: SelectChangeEvent<string>) => {
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
    dispatch(setProductFilter(newFilter));
    setCategoryName(newCategories);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <FilterHeader title="Category" />
        <InputLabel></InputLabel>
        {isSearch ? (
          <Box position="relative" width="100%">
            <Box position="absolute" left="8%" top="30%">
              Select
            </Box>
            <Select
              fullWidth
              multiple
              value={categoryName}
              onChange={handleChange}
              renderValue={() => null}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  <Checkbox
                    // checked={
                    //   filter.category.find((x) => x === category.name) !==
                    //   undefined
                    // }
                    checked={categoryName.indexOf(category.name) > -1}
                  />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : (
          <>
            <Select
              value={
                productSettings.productFilter.category &&
                productSettings.productFilter.category.length > 0
                  ? productSettings.productFilter.category[0]
                  : displayCategories[0].name
              }
              onChange={updateCategory}
              fullWidth
            >
              {displayCategories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </FormControl>
    </Box>
  );
};
