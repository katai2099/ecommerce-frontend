import styled from "@emotion/styled";
import { ChevronRight, LogoutOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { OrderHistory } from "../../admin/components/OrderHistory";
import { AppBox } from "../../styles/common";
import { AddressBook } from "../components/AddressBook";

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
  const location = useLocation();
  return (
    <AppBox>
      <Typography variant="h2" mb="32px" letterSpacing="-0.8px">
        {location.pathname.split("/")[2]
          ? location.pathname.split("/")[2].toUpperCase()
          : "orders".toUpperCase()}
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={3}>
          <AccountPaper elevation={3}>
            <Link to={"/account/orders"} className="nav-item">
              <FlexBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                color="black"
              >
                <Typography>Orders</Typography>
                <ChevronRight />
              </FlexBox>
            </Link>
          </AccountPaper>
          <AccountPaper elevation={3}>
            <FlexBox mb="8px">
              <Typography>Profile info</Typography>
              <ChevronRight />
            </FlexBox>
            <Link to="/account/address" className="nav-item">
              <FlexBox mb="8px" color="black">
                <Typography>Address</Typography>
                <ChevronRight />
              </FlexBox>
            </Link>
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
          <Routes>
            <Route path="/" element={<OrderHistory />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/address" element={<AddressBook />} />
          </Routes>
        </Grid>
      </Grid>
    </AppBox>
  );
};
