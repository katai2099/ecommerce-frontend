import { ChevronRight, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../reducers/combineReducer";

export const PersonMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const popoverAnchor = useRef(null);

  const handlePaperClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(null);
  };
  const handleClose = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <IconButton
        ref={popoverAnchor}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseLeave={handleClose}
        // onClick={() => {
        //   navigate("/login");
        // }}
      >
        <PersonOutline />
      </IconButton>
      <Popover
        className="popover"
        classes={{ paper: "popover-content" }}
        id="basic-menu"
        anchorEl={popoverAnchor.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: 70,
        }}
        slotProps={{
          paper: {
            onMouseEnter: handleClick,
            onMouseLeave: handlePaperClose,
          },
        }}
      >
        <Box p="12px" minWidth="300px">
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
                sx={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => {
                  navigate("/account/orders");
                  setAnchorEl(null);
                }}
              >
                Orders
              </Button>
              <Divider />
              <Button
                endIcon={<ChevronRight />}
                fullWidth
                sx={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => {
                  navigate("/account/details");
                  setAnchorEl(null);
                }}
              >
                Manage Account
              </Button>
              <Divider />
              <Button
                endIcon={<ChevronRight />}
                fullWidth
                sx={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => {
                  navigate("/login");
                  setAnchorEl(null);
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
                sx={{ display: "flex", justifyContent: "space-between" }}
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
                sx={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </div>
  );
};
