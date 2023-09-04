import {
  Adb,
  PersonOutline,
  SearchOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { LoginDialog } from "../login/LoginDialog";
import { useState } from "react";
import { CartMenu } from "../cart/CartMenu";

export const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);

  const handleProfileButtonClick = () => {
    setOpenLoginModal(!openLoginModal);
  };

  const handleToggleCartDrawer = (open: boolean) => {
    setOpenCartDrawer(open);
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
                // fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                // color: "inherit",
                textDecoration: "none",
              }}
            >
              ECOMMERCE
            </Typography>
            <Typography color="primary">Men</Typography>
            <Typography color="primary">Women</Typography>
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
