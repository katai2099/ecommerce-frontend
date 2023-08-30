import { Box, Rating, Typography, styled } from "@mui/material";

const FlexBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductItem = () => {
  return (
    <FlexBox>
      <Box>
        <img src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FClothes%2F1.SilverHighNeckSweater.png&w=384&q=75"></img>
      </Box>
      <FlexBox>
        <Typography>High neck Sweater</Typography>
        <Typography>$210.00 $</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating value={2.0} size="small" readOnly />
          <Typography>(0 Reviews)</Typography>
        </Box>
      </FlexBox>
    </FlexBox>
  );
};
