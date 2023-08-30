import { Remove, Add, CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export const OrderDetailProduct = () => {
  return (
    <Box
      p="0px 0 24px"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box display="flex" gap="24px" width="100%">
        <Box>
          <img
            width="120px"
            height="140px"
            alt=""
            src="https://static.bershka.net/4/photos2/2023/I/0/2/p/5420/352/400/b2862664c8a41e5a1f93c3f162f1d41c-5420352400_2_4_0.jpg?imwidth=124&impolicy=bershka-itxhigh&imformat=generic"
          />
        </Box>
        <Box width="70%">
          <Box mb="5px">
            <Typography fontWeight="bold">BAGGY PANT </Typography>
            <Typography>39 $ </Typography>
          </Box>

          <Typography>Size: M</Typography>
          <Typography>Quantity: 1</Typography>

          <Typography>Total: 78.00 $</Typography>
        </Box>
      </Box>
    </Box>
  );
};
