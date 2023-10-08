import {
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
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setOpen } from "../../../reducers/cartReducer";
import { RootState } from "../../../reducers/combineReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { PersonMenu } from "../PersonMenu";
import { CartSidebar } from "../cart/CartSidebar";

export const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const totalItems = cart.carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  const dispatch = useAppDispatch();
  const filter = useSelector(
    (state: RootState) => state.productSettings.filter
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchValue(filter.q ? filter.q : "");
  }, [filter.q]);

  const handleToggleCartDrawer = (open: boolean) => {
    dispatch(setOpen(open));
  };

  const permitPath =
    !location.pathname.includes("checkout") &&
    !location.pathname.includes("login") &&
    !location.pathname.includes("register");

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
              {permitPath && (
                <>
                  <Link className="nav-item" to="/men">
                    <Typography color="primary">Men</Typography>
                  </Link>
                  <Link className="nav-item" to={"/women"}>
                    <Typography color="primary">Women</Typography>
                  </Link>
                </>
              )}
            </Stack>
            {permitPath && (
              <>
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
                          if (e.key === "Enter" && searchValue.length !== 0) {
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
                  <PersonMenu />
                  <IconButton
                    onClick={() => {
                      handleToggleCartDrawer(true);
                    }}
                  >
                    <Badge badgeContent={totalItems} color="secondary">
                      <ShoppingBagOutlined />
                    </Badge>
                  </IconButton>
                </Stack>
              </>
            )}
          </Stack>
          <CartSidebar
            open={cart.open}
            toggleDrawer={handleToggleCartDrawer}
            totalItems={totalItems}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
