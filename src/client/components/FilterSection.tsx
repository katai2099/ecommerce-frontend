import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { CategoryFilter } from "./CategoryFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RatingFilter } from "./RatingFilter";
import { GenderFilter } from "./GenderFilter";

export interface FilterSectionProps {
  isSearch?: boolean;
}

export const FilterSection = ({ isSearch = false }: FilterSectionProps) => {
  return (
    <Paper sx={{ p: "32px" }}>
      <Stack spacing={4}>
        {isSearch && <GenderFilter />}
        <CategoryFilter />
        <PriceRangeFilter />
        <RatingFilter />
      </Stack>
    </Paper>
  );
};
