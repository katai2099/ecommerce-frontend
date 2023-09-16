import { Box, Typography } from "@mui/material";
import { AppBox } from "../../../styles/common";

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#222935" }}>
      <AppBox p="40px 0">
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap="30px"
          columnGap="clamp(20px, 30px, 40px)"
        >
          <Box width="clamp(20%,30%,40%)">
            <Typography variant="h4" fontWeight="bold" mb="30px">
              ECOMMERCE
            </Typography>
            <Box>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit corrupti, id amet provident ullam molestiae aliquid,
              suscipit quam dolore earum, quidem aut natus repellendus harum
              ducimus qui quas autem nisi!
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
              About Us
            </Typography>
            <Typography mb="30px">Careers</Typography>
            <Typography mb="30px">Our Stores</Typography>
            <Typography mb="30px">Terms & Conditions</Typography>
            <Typography mb="30px">Privary policy</Typography>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
              Customer Care
            </Typography>
            <Typography mb="30px">Help Center</Typography>
            <Typography mb="30px">Track Your Order</Typography>
            <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
            <Typography mb="30px">Returns & Refunds</Typography>
          </Box>
          <Box width="clamp(20%,25%,30%)">
            <Typography variant="h4" fontWeight="bold" mb="30px">
              Contact Us
            </Typography>
            <Typography mb="30px">Budapest, Hungary, 1082</Typography>
            <Typography mb="30px">Email: ecommerce@gmail.com</Typography>
            <Typography mb="30px">(36) 20 555 6666</Typography>
          </Box>
        </Box>
      </AppBox>
    </Box>
  );
};
