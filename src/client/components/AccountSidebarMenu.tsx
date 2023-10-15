import { ChevronRight, LogoutOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/userActions";
import { setMobileAccountMenuOpen } from "../../reducers/accountReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AccountPaper, FlexBox } from "../../styles/common";

export const AccountSidebarMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matchMb = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width="100%">
      <Typography
        fontSize="16px"
        sx={{ textTransform: "uppercase" }}
        color="GrayText"
        padding="0 12px"
      >
        Orders
      </Typography>
      <AccountPaper elevation={3}>
        <Link
          to={"/account/orders"}
          className="nav-item"
          onClick={() => {
            if (matchMb) {
              dispatch(setMobileAccountMenuOpen(false));
            }
          }}
        >
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
      <Typography
        fontSize="16px"
        sx={{ textTransform: "uppercase" }}
        color="GrayText"
        padding="0 12px"
        mt="16px"
      >
        Account settings
      </Typography>
      <AccountPaper elevation={3}>
        <Link
          to="/account/details"
          className="nav-item"
          onClick={() => {
            if (matchMb) {
              dispatch(setMobileAccountMenuOpen(false));
            }
          }}
        >
          <FlexBox mb="8px" color="black">
            <Typography>Profile info</Typography>
            <ChevronRight />
          </FlexBox>
        </Link>
        <Link
          to="/account/address"
          className="nav-item"
          onClick={() => {
            if (matchMb) {
              dispatch(setMobileAccountMenuOpen(false));
            }
          }}
        >
          <FlexBox mb="8px" color="black">
            <Typography>Address</Typography>
            <ChevronRight />
          </FlexBox>
        </Link>
      </AccountPaper>
      <AccountPaper
        elevation={3}
        onClick={() => {
          dispatch(logoutAction());
          navigate("/login");
        }}
      >
        <FlexBox>
          <Typography>Log out</Typography>
          <LogoutOutlined fontSize="small" />
        </FlexBox>
      </AccountPaper>
    </Box>
  );
};
