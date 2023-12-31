import { Inventory } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const NoContentFound = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Inventory sx={{ fontSize: "64px" }} />
      <Typography variant="h2" mt="24px" mb="12px">
        Oops!
      </Typography>
      <Typography>We haven't found any results.</Typography>
    </Box>
  );
};
