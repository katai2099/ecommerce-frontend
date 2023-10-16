import {
  Close,
  Menu,
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
import {
  RootState,
  getAppInitialState,
  setInitialState,
} from "../../../reducers/combineReducer";
import {
  setMbGenderMenuOpen,
  setMbSearchBarOpen,
} from "../../../reducers/guiReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { GenderMbMenu, MobileSearchbar } from "../MobileMenu";
import { PersonMenu } from "../PersonMenu";
import { CartSidebar } from "../cart/CartSidebar";

export const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const totalItems = cart.carts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  const dispatch = useAppDispatch();
  const filter = useSelector((state: RootState) => state.productList.filter);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const isGenderMenuOpen = useSelector(
    (state: RootState) => state.gui.mbGenderMenuOpen
  );
  const isMbSearchbarOpen = useSelector(
    (state: RootState) => state.gui.mbSearchBarOpen
  );

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
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Toolbar sx={{ paddingX: { xs: 0, smartphone: "16px" } }}>
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
                component="a"
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  cursor: "pointer !important",
                }}
                onClick={() => {
                  const initialState = getAppInitialState();
                  dispatch(setInitialState({ state: initialState }));
                  navigate("/");
                }}
              >
                ECOMMERCE
              </Typography>
              {permitPath && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <Link
                    className="nav-item"
                    to="/men"
                    onClick={() => {
                      if (isMbSearchbarOpen) {
                        dispatch(setMbSearchBarOpen(false));
                      }
                    }}
                  >
                    <Typography color="primary">Men</Typography>
                  </Link>
                  <Link
                    className="nav-item"
                    to={"/women"}
                    onClick={() => {
                      if (isMbSearchbarOpen) {
                        dispatch(setMbSearchBarOpen(false));
                      }
                    }}
                  >
                    <Typography color="primary">Women</Typography>
                  </Link>
                </Stack>
              )}
            </Stack>
            {permitPath && (
              <>
                <Box
                  alignItems="center"
                  padding="8px 48px"
                  flex="1 1 0"
                  sx={{ display: { xs: "none", bigNav: "flex" } }}
                >
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
                          <SearchRounded
                            onClick={() => {
                              if (searchValue.length !== 0) {
                                navigate(`/search?q=${searchValue}`);
                              }
                            }}
                          />
                        </InputAdornment>
                      }
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSearchValue(event.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchValue.length !== 0) {
                          navigate(`/search?q=${searchValue}`);
                        }
                      }}
                    />
                  </FormControl>
                </Box>
                <Stack
                  spacing={{ xs: 0, smartphone: 1, sm: 2 }}
                  direction="row"
                >
                  <IconButton
                    sx={{ display: { xs: "flex", bigNav: "none" } }}
                    onClick={() => {
                      dispatch(setMbGenderMenuOpen(false));
                      dispatch(setMbSearchBarOpen(!isMbSearchbarOpen));
                    }}
                  >
                    {isMbSearchbarOpen ? <Close /> : <SearchOutlined />}
                  </IconButton>
                  <PersonMenu />
                  <IconButton
                    onClick={() => {
                      dispatch(setMbGenderMenuOpen(false));
                      if (isMbSearchbarOpen) {
                        dispatch(setMbSearchBarOpen(false));
                      }
                      handleToggleCartDrawer(true);
                    }}
                  >
                    <Badge badgeContent={totalItems} color="secondary">
                      <ShoppingBagOutlined />
                    </Badge>
                  </IconButton>
                  <IconButton
                    sx={{ display: { xs: "flex", sm: "none" } }}
                    onClick={() => {
                      if (isMbSearchbarOpen) {
                        dispatch(setMbSearchBarOpen(false));
                      }
                      dispatch(setMbGenderMenuOpen(!isGenderMenuOpen));
                    }}
                  >
                    {isGenderMenuOpen ? <Close /> : <Menu />}
                  </IconButton>
                </Stack>
              </>
            )}
          </Stack>
        </Toolbar>
        <CartSidebar
          open={cart.open}
          toggleDrawer={handleToggleCartDrawer}
          totalItems={totalItems}
        />
        {isMbSearchbarOpen && <MobileSearchbar />}
        {isGenderMenuOpen && <GenderMbMenu />}
      </Container>
    </AppBar>
  );
};
