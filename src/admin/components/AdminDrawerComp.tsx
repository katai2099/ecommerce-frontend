import {
  Category,
  ChevronLeft,
  DashboardOutlined,
  ExitToApp,
  Fullscreen,
  Inventory,
  Menu,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/userActions";
import { useAppDispatch } from "../../store/configureStore";
import { AdminAppBar, AdminDrawer } from "../style/common";

export const AdminDrawerComp = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    dispatch(logoutAction());
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <>
      <AdminAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {location.pathname}
          </Typography>
          <Button
            endIcon={<ExitToApp />}
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AdminAppBar>
      <AdminDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/product");
            }}
          >
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Fullscreen />
            </ListItemIcon>
            <ListItemText primary="Sizes" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </AdminDrawer>
    </>
  );
};
