import {
  PersonOutline,
  SearchOutlined,
  SearchRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gender } from "../../../model/product";
import { CartMenu } from "../cart/CartMenu";
import { LoginDialog } from "../login/LoginDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/combineReducer";

export const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);
  const filter = useSelector(
    (state: RootState) => state.productSettings.filter
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(filter.q ? filter.q : "");
  }, [filter.q]);

  const handleProfileButtonClick = () => {
    setOpenLoginModal(!openLoginModal);
  };

  const handleToggleCartDrawer = (open: boolean) => {
    setOpenCartDrawer(open);
  };

  const handleSectionClick = (gender: Gender) => {
    navigate(`/${gender.toLowerCase()}`);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "rgba(255,255,255,0.95)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                color="primary"
                variant="h6"
                noWrap
                href="/"
                component="a"
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                ECOMMERCE
              </Typography>
              <Link
                className="nav-item"
                to="/men"
                onClick={() => {
                  handleSectionClick(Gender.MEN);
                }}
              >
                <Typography color="primary">Men</Typography>
              </Link>
              <Link
                className="nav-item"
                to={"/women"}
                onClick={() => {
                  handleSectionClick(Gender.WOMEN);
                }}
              >
                <Typography color="primary">Women</Typography>
              </Link>
            </Stack>
            <Stack flex="1 1 0">
              <Box display="flex" alignItems="center" padding="8px 48px">
                <FormControl fullWidth>
                  <OutlinedInput
                    size="medium"
                    sx={{ borderRadius: "32px" }}
                    value={searchValue}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{ cursor: "pointer" }}
                      >
                        <SearchRounded />
                      </InputAdornment>
                    }
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setSearchValue(event.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        navigate(`/search/${searchValue}`);
                      }
                    }}
                  />
                </FormControl>
              </Box>
            </Stack>
            <Stack spacing={2} direction="row">
              <IconButton sx={{ display: { sm: "flex", md: "none" } }}>
                <SearchOutlined />
              </IconButton>
              <IconButton onClick={handleProfileButtonClick}>
                <PersonOutline />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleToggleCartDrawer(true);
                }}
              >
                <Badge badgeContent={4} color="secondary">
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>
            </Stack>
          </Stack>
          <LoginDialog
            onClose={handleProfileButtonClick}
            open={openLoginModal}
          />
          <CartMenu
            open={openCartDrawer}
            toggleDrawer={handleToggleCartDrawer}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
