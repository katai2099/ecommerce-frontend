import { Menu } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { OrderHistory } from "../../admin/components/OrderHistory";
import { setMobileAccountMenuOpen } from "../../reducers/accountReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { AccountMobileMenu } from "../components/AccountMobileMenu";
import { AccountSidebarMenu } from "../components/AccountSidebarMenu";
import { AddressBook } from "../components/AddressBook";
import { OrderDetailComp } from "../components/OrderDetailComp";
import { UserDetail } from "../components/UserDetail";

export const Account = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <AppBox>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="32px"
      >
        <Typography variant="h2" letterSpacing="-0.8px">
          {location.pathname.split("/")[2]
            ? location.pathname.split("/")[2].toUpperCase()
            : "orders".toUpperCase()}
        </Typography>
        <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
          <IconButton
            onClick={() => {
              dispatch(setMobileAccountMenuOpen(true));
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      </Box>
      <AccountMobileMenu />
      <Grid container spacing={3}>
        <Grid item xs={0} md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <AccountSidebarMenu />
        </Grid>
        <Grid item xs={12} md={8}>
          <Routes>
            <Route path="/" element={<OrderHistory />} />
            <Route path="/orders">
              <Route path="/orders/:id" element={<OrderDetailComp />} />
              <Route path="" element={<OrderHistory />} />
            </Route>
            <Route path="/details" element={<UserDetail />} />
            <Route path="/address" element={<AddressBook />} />
          </Routes>
        </Grid>
      </Grid>
    </AppBox>
  );
};
