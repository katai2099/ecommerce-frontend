import {
  PersonOutline,
  SearchOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gender } from "../../../model/product";
import { CartMenu } from "../cart/CartMenu";
import { LoginDialog } from "../login/LoginDialog";

export const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

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
            direction="row"
            spacing={2}
            sx={{ flexGrow: 1 }}
            alignItems="center"
          >
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
          <Stack spacing={2} direction="row">
            <IconButton>
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
