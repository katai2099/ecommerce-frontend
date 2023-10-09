import styled from "@emotion/styled";
import { Box, Button, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { setProductFilter } from "../../reducers/productSettingsReducer";
import { useAppDispatch } from "../../store/configureStore";
import { FilterHeader } from "./common/FilterHeader";

const FlexBox = styled(Box)(({ theme }) => ({
  ...theme,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const PriceRangeFilter = () => {
  const filter = useSelector(
    (state: RootState) => state.productSettings.filter
  );
  const [value, setValue] = useState<number[]>([0, 100]);

  useEffect(() => {
    if (!filter.pmin && !filter.pmax) {
      setValue([0, 100]);
    }
  }, [filter.pmin, filter.pmax]);

  const dispatch = useAppDispatch();

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const setPriceRange = () => {
    const newFilter = {
      ...filter,
      pmin: value[0],
      pmax: value[1],
      page: 1,
    };
    dispatch(setProductFilter(newFilter));
  };

  return (
    <Box>
      <FilterHeader title="Price range" />
      <FlexBox mt="12px" gap="8px">
        <FlexBox
          flex="1"
          border="1px solid #c0bebe"
          borderRadius="4px"
          padding="2px 8px"
        >
          <Box color="GrayText" fontSize="12px">
            Min $
          </Box>
          <Box fontWeight="bold">{value[0]}</Box>
        </FlexBox>
        <FlexBox
          flex="1"
          border="1px solid #c0bebe"
          borderRadius="4px"
          padding="2px 8px"
        >
          <Box color="GrayText" fontSize="12px">
            Max $
          </Box>
          <Box fontWeight="bold">{value[1]}</Box>
        </FlexBox>
      </FlexBox>
      <Box display="flex" mt="12px">
        <Slider
          size="small"
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          max={100}
          min={0}
          step={10}
        />
        <Box ml="8px">
          <Button
            sx={{ minWidth: "32px", padding: "4px 8px" }}
            variant="contained"
            onClick={setPriceRange}
          >
            GO
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
