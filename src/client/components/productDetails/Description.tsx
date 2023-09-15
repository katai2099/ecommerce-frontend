import { Box, Typography } from "@mui/material";

interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: DescriptionProps) => {
  return (
    <Box>
      <Typography fontWeight="bold">Description</Typography>
      <Typography pt="8px" color="gray" fontSize="16px">
        {description}
      </Typography>
    </Box>
  );
};
