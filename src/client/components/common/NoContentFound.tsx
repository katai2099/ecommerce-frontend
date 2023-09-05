import { Inventory } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const NoContentFound = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Inventory sx={{ fontSize: "64px" }} />
      <Typography>No products found</Typography>
    </Box>
  );
};
