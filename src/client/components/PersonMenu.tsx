import { ChevronRight, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutAction } from "../../actions/userActions";
import { RootState } from "../../reducers/combineReducer";
import {
  setMbGenderMenuOpen,
  setMbSearchBarOpen,
} from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";

export const PersonMenu = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matchSmallNav = useMediaQuery(theme.breakpoints.down("bigNav"));
  const user = useSelector((state: RootState) => state.user);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (matchSmallNav) {
      dispatch(setMbGenderMenuOpen(false));
      dispatch(setMbSearchBarOpen(false));

      if (user.loggedIn) {
        navigate("/account");
      } else {
        navigate("/login");
      }
      return;
    }
    handleToggle();
  };

  return (
    <div>
      <IconButton
        ref={anchorRef}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonOutline />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ p: "12px", minWidth: "300px" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Typography
                    variant="h3"
                    ml="8px"
                    mb="16px"
                    mt="8px"
                    fontWeight="bold"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {user.loggedIn
                      ? `Welcome ${user.firstname} ${user.lastname}`
                      : "Welcome"}
                  </Typography>

                  {user.loggedIn ? (
                    <>
                      <Button
                        endIcon={<ChevronRight />}
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={(event) => {
                          handleClose(event);
                          navigate("/account/orders");
                        }}
                      >
                        Orders
                      </Button>
                      <Divider />
                      <Button
                        endIcon={<ChevronRight />}
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={(event) => {
                          handleClose(event);
                          navigate("/account/details");
                        }}
                      >
                        Manage Account
                      </Button>
                      <Divider />
                      <Button
                        endIcon={<ChevronRight />}
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={(event) => {
                          dispatch(logoutAction());
                          handleClose(event);
                          navigate("/login");
                        }}
                      >
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        endIcon={<ChevronRight />}
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        Create An Account
                      </Button>
                      <Divider />
                      <Button
                        endIcon={<ChevronRight />}
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login
                      </Button>
                    </>
                  )}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
