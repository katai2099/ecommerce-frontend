import { Box, Grid, Paper, Typography } from "@mui/material";
import { AppBox } from "../../styles/common";
import {
  ChevronLeft,
  ChevronRight,
  Logout,
  LogoutOutlined,
  SignpostOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { OrderHistory } from "../../admin/components/OrderHistory";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AccountPaper = styled(Paper)(({ theme }) => ({
  ...theme,
  marginBottom: "8px",
  padding: "8px 12px",
}));

export const Account = () => {
  return (
    <AppBox>
      <Typography variant="h4" mb="32px">
        ALL orders
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={3}>
          <AccountPaper elevation={3}>
            <FlexBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Orders</Typography>
              <ChevronRight />
            </FlexBox>
          </AccountPaper>
          <AccountPaper elevation={3}>
            <FlexBox mb="8px">
              <Typography>Profile info</Typography>
              <ChevronRight />
            </FlexBox>
            <FlexBox mb="8px">
              <Typography>Address</Typography>
              <ChevronRight />
            </FlexBox>
            <FlexBox mb="8px">
              <Typography>Payment methods</Typography>
              <ChevronRight />
            </FlexBox>
          </AccountPaper>
          <AccountPaper elevation={3}>
            <FlexBox>
              <Typography>Sign out</Typography>
              <LogoutOutlined fontSize="small" />
            </FlexBox>
          </AccountPaper>
        </Grid>
        <Grid item lg={9}>
          <OrderHistory />
        </Grid>
      </Grid>
    </AppBox>
  );
};
