import { Add, Close, CloseOutlined, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography, styled } from "@mui/material";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartProduct = () => {
  return (
    <Box
      p="8px 0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box flex="1 1 40%">
        <img
          width="120px"
          height="140px"
          alt=""
          src="https://static.bershka.net/4/photos2/2023/I/0/2/p/5420/352/400/b2862664c8a41e5a1f93c3f162f1d41c-5420352400_2_4_0.jpg?imwidth=124&impolicy=bershka-itxhigh&imformat=generic"
        />
      </Box>
      <Box flex="1 1 60%">
        <FlexBox mb="5px">
          <Typography fontWeight="bold">BAGGY PANT </Typography>
          <IconButton>
            <CloseOutlined />
          </IconButton>
        </FlexBox>
        <Typography>39 $</Typography>
        <Typography>Size: M</Typography>
        <FlexBox m="15px 0">
          <Box display="flex" alignItems="center">
            <IconButton>
              <Remove />
            </IconButton>
            <Typography>2</Typography>
            <IconButton>
              <Add />
            </IconButton>
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
};
