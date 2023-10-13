import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Gender } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import { setProductsFilter } from "../../reducers/productListReducer";
import { LgScreenProps } from "./MobileFilter";
import { FilterHeader } from "./common/FilterHeader";

export const GenderFilter = ({ isLgScreen = true }: LgScreenProps) => {
  const [checked, setChecked] = useState<boolean[]>([false, false]);
  const genderValues = Object.values(Gender);
  const filter = useSelector((state: RootState) => state.productList.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter.gender.length === 0) {
      setChecked([false, false]);
    } else if (filter.gender.length === 1) {
      if (filter.gender[0] === Gender.MEN) {
        setChecked([true, false]);
      } else {
        setChecked([false, true]);
      }
    }
  }, [filter.gender]);

  const handleCheck = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked.map((item, idx) =>
      idx === index ? event.target.checked : item
    );
    const genders = updatedChecked
      .map((check, idx) => (check ? genderValues[idx] : null))
      .filter((value): value is Gender => value !== null);
    const updatedFilter = { ...filter, gender: genders, page: 1 };
    dispatch(setProductsFilter(updatedFilter));
    setChecked(updatedChecked);
  };

  return (
    <Box>
      {isLgScreen && <FilterHeader title={"Gender"} />}
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
