import { Typography } from "@mui/material";

interface FilterHeaderProps {
  title: string;
}

export const FilterHeader = ({ title }: FilterHeaderProps) => {
  return (
    <Typography mb="8px" variant="h5" fontWeight="bold">
      {title}
    </Typography>
  );
};
