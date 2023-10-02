import styled from "@emotion/styled";
import { East } from "@mui/icons-material";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";

const OrderPaper = styled(Paper)(({ theme }) => ({
  ...theme,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "8px 16px",
  margin: "1rem 0",
  cursor: "pointer",
}));

export const OrderHistory = () => {
  return (
    <Grid>
      <Box display="flex" flexWrap="wrap" alignItems="center" padding="0 16px">
        <Typography className="flex-grow">Order #</Typography>
        <Typography className="flex-grow">Status</Typography>
        <Typography className="flex-grow">Date purchased</Typography>
        <Typography className="flex-grow">Total</Typography>
      </Box>
      <OrderPaper>
        <Typography className="flex-grow">123124</Typography>
        <Box className="flex-grow">
          <Chip label="Processing" />
        </Box>
        <Typography className="flex-grow">
          {new Date().toISOString()}
        </Typography>
        <Typography className="flex-grow">$350.00</Typography>
        <East />
      </OrderPaper>
      <OrderPaper>
        <Typography className="flex-grow">123124</Typography>
        <Box className="flex-grow">
          <Chip label="Processing" />
        </Box>
        <Typography className="flex-grow">
          {new Date().toISOString()}
        </Typography>
        <Typography className="flex-grow">$350.00</Typography>
        <East />
      </OrderPaper>
      <OrderPaper>
        <Typography className="flex-grow">123124</Typography>
        <Box className="flex-grow">
          <Chip label="Processing" />
        </Box>
        <Typography className="flex-grow">
          {new Date().toISOString()}
        </Typography>
        <Typography className="flex-grow">$350.00</Typography>
        <East />
      </OrderPaper>
    </Grid>
  );
};
