import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  if (location.pathname.includes("checkout")) {
    return null;
  }
  return (
    <Box sx={{ bgcolor: "#f2f2f2" }}>
      <Box p="40px 24px 40px" maxWidth="1280px" margin="80px auto 0">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" mb="30px">
                ECOMMERCE
              </Typography>
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit corrupti, id amet provident ullam molestiae
                aliquid, suscipit quam dolore earum, quidem aut natus
                repellendus harum ducimus qui quas autem nisi!
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" mb="30px">
                About Us
              </Typography>
              <Typography mb="30px">Careers</Typography>
              <Typography mb="30px">Our Stores</Typography>
              <Typography mb="30px">Terms & Conditions</Typography>
              <Typography mb="30px">Privary policy</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" mb="30px">
                Customer Care
              </Typography>
              <Typography mb="30px">Help Center</Typography>
              <Typography mb="30px">Track Your Order</Typography>
              <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
              <Typography mb="30px">Returns & Refunds</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" mb="30px">
                Contact Us
              </Typography>
              <Typography mb="30px">Budapest, Hungary, 1082</Typography>
              <Typography mb="30px">Email: ecommerce@gmail.com</Typography>
              <Typography mb="30px">(36) 20 555 6666</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
