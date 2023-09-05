import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { setProductFilter } from "../../reducers/productSettingsReducer";
import { FilterHeader } from "./common/FilterHeader";

const values: number[] = [4, 3, 2, 1, 0];

export const RatingFilter = () => {
  const currentFilter = useSelector(
    (state: RootState) => state.productSettings.productFilter
  );
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFilter = {
      ...currentFilter,
      rating: Number(event.target.value),
      page: 1,
    };
    dispatch(setProductFilter(newFilter));
  };

  return (
    <Box>
      <FilterHeader title="Rating" />
      <RadioGroup
        value={
          currentFilter.rating
            ? currentFilter.rating
            : values[values.length - 1]
        }
        onChange={handleChange}
      >
        {values.map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio size="small" />}
            label={
              <Box display="flex" alignItems="center">
                <Rating readOnly value={value} />
                <Typography ml="8px">& Up</Typography>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Box>
  );
};
