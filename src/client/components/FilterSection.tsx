import { Paper, Stack } from "@mui/material";
import { CategoryFilter } from "./CategoryFilter";
import { GenderFilter } from "./GenderFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RatingFilter } from "./RatingFilter";

export interface FilterSectionProps {
  isSearch?: boolean;
}

export const FilterSection = ({ isSearch = false }: FilterSectionProps) => {
  return (
    <Paper sx={{ p: "32px" }}>
      <Stack spacing={4}>
        {isSearch && <GenderFilter />}
        <CategoryFilter isSearch={isSearch} />
        <PriceRangeFilter />
        <RatingFilter />
      </Stack>
    </Paper>
  );
};
