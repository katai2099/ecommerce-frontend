import { Close, FilterList } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import { Box } from "@mui/system";

export const MobileFilter = () => {
  return (
    <Box mt="12px" mb="24px">
      <Box textAlign="end">
        <IconButton>
          <FilterList />
        </IconButton>
      </Box>
      <Drawer open anchor="right">
        <Box
          mt="16px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton>
            <Close />
          </IconButton>
          <Box>Clear</Box>
        </Box>
      </Drawer>
    </Box>
  );
};
