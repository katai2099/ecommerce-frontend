import {
  LocalShipping,
  MonetizationOn,
  SentimentSatisfiedAlt,
  SwitchAccessShortcutAdd,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

export const Promote = () => {
  return (
    <Box my="48px">
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h3" fontWeight="bold">
            We provide best
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            customer experiences
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            paddingLeft="16px"
            borderLeft="2px solid black"
          >
            <Typography color="GrayText">
              We ensure our customers the best shopping experience
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt="12px" spacing={3}>
        <Grid item md={3}>
          <Box
            display="inline-block"
            padding="8px"
            bgcolor="#f0f0f0"
            borderRadius="4px"
          >
            <MonetizationOn />
          </Box>
          <Typography variant="h3" fontSize="16px" mt="4px" fontWeight="bold">
            Original Products
          </Typography>
          <Typography color="GrayText" mt="4px" lineHeight="1.3">
            Experience the exceptional with Original Products
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Box
            display="inline-block"
            padding="8px"
            bgcolor="#f0f0f0"
            borderRadius="4px"
          >
            <SentimentSatisfiedAlt />
          </Box>
          <Typography variant="h3" fontSize="16px" mt="4px" fontWeight="bold">
            Satisfaction Guarantee
          </Typography>
          <Typography color="GrayText" mt="4px" lineHeight="1.3">
            Your satisfaction, our promise
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Box
            display="inline-block"
            padding="8px"
            bgcolor="#f0f0f0"
            borderRadius="4px"
          >
            <SwitchAccessShortcutAdd />
          </Box>
          <Typography variant="h3" fontSize="16px" mt="4px" fontWeight="bold">
            In Trends Products
          </Typography>
          <Typography color="GrayText" mt="4px" lineHeight="1.3">
            We keep our collections update to date
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Box
            display="inline-block"
            padding="8px"
            bgcolor="#f0f0f0"
            borderRadius="4px"
          >
            <LocalShipping />
          </Box>
          <Typography variant="h3" fontSize="16px" mt="4px" fontWeight="bold">
            Fast & Free Shipping
          </Typography>
          <Typography color="GrayText" mt="4px" lineHeight="1.3">
            We Offer fast and free shipping for our custormer
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
