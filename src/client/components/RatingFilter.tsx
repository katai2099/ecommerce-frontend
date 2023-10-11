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
import { setProductsFilter } from "../../reducers/productListReducer";
import { LgScreenProps } from "./MobileFilter";
import { FilterHeader } from "./common/FilterHeader";

const values: number[] = [4, 3, 2, 1];

export const RatingFilter = ({ isLgScreen = true }: LgScreenProps) => {
  const filter = useSelector((state: RootState) => state.productList.filter);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedFilter = {
      ...filter,
      rating: Number(event.target.value),
      page: 1,
    };
    dispatch(setProductsFilter(updatedFilter));
  };

  return (
    <Box>
      {isLgScreen && <FilterHeader title="Rating" />}
      <RadioGroup value={filter.rating} onChange={handleChange}>
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
