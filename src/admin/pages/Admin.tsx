import {
  BarChart,
  ChevronLeft,
  Copyright,
  DashboardOutlined,
  Layers,
  Menu,
  Notifications,
  People,
  ProductionQuantityLimits,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { Product } from "./Product";
import { CreateProduct } from "./CreateProduct";

const drawerWidth: number = 240;

interface MyAppBarProps extends AppBarProps {
  open?: boolean;
}

const AdminAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<MyAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AdminDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const Admin = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AdminAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
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
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
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
          {/* {mainListItems} */}
          <ListItemButton
            onClick={() => {
              setSelectedMenu("dashboard");
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
          <ListItemButton>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setSelectedMenu("product");
            }}
          >
            <ListItemIcon>
              <ProductionQuantityLimits />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Layers />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */}
        </List>
      </AdminDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {selectedMenu === "dashboard" && <Dashboard />}
          {selectedMenu === "product" && <CreateProduct />}
        </Container>
      </Box>
    </Box>
  );
};
