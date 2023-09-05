import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Gender } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import { setProductFilter } from "../../reducers/productSettingsReducer";
import { FilterHeader } from "./common/FilterHeader";

export const GenderFilter = () => {
  const [checked, setChecked] = useState<boolean[]>([false, false]);
  const genderValues = Object.values(Gender);
  const currentFilter = useSelector(
    (state: RootState) => state.productSettings.productFilter
  );
  const dispatch = useDispatch();

  const handleCheck = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked.map((item, i) =>
      i === index ? event.target.checked : item
    );
    const genders = updatedChecked
      .map((check, idx) => (check ? genderValues[idx] : null))
      .filter((value): value is Gender => value !== null);
    const newFilter = { ...currentFilter, gender: genders, page: 1 };
    dispatch(setProductFilter(newFilter));
    setChecked(updatedChecked);
  };
  return (
    <Box>
      <FilterHeader title={"Gender"} />
      <FormGroup>
        {genderValues.map((value, index) => (
          <FormControlLabel
            key={value}
            control={
              <Checkbox
                checked={checked[index]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleCheck(index, event);
                }}
              />
            }
            label={value}
            name={value}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
