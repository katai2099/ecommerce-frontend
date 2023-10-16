import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  colors,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setMbGenderMenuOpen,
  setMbSearchBarOpen,
} from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";

export const GenderMbMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        display: { xs: "block", sm: "none" },
        position: "absolute",
        width: "100%",
        left: 0,
        height: "100vh",
      }}
    >
      <Divider />
      <MenuItem
        onClick={() => {
          dispatch(setMbGenderMenuOpen(false));
          navigate("/men");
        }}
      >
        MEN
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          dispatch(setMbGenderMenuOpen(false));
          navigate("/women");
        }}
      >
        WOMEN
      </MenuItem>
    </Paper>
  );
};

export const MobileSearchbar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Paper
      sx={{
        display: { xs: "block", bigNav: "none" },
        position: "absolute",
        width: "100%",
        left: 0,
        height: "100vh",
      }}
    >
      <Divider />
      <Box
        alignItems="center"
        padding="8px 24px"
        justifyContent="space-between"
        flex="1 1 0"
        sx={{ display: { xs: "flex", bigNav: "none" } }}
      >
        <FormControl fullWidth>
          <OutlinedInput
            placeholder="Search here"
            size="medium"
            sx={{ borderRadius: "32px" }}
            value={searchValue}
            startAdornment={
              <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                <SearchRounded
                  onClick={() => {
                    if (searchValue.length !== 0) {
                      dispatch(setMbSearchBarOpen(false));
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
                dispatch(setMbSearchBarOpen(false));
                navigate(`/search?q=${searchValue}`);
              }
            }}
          />
        </FormControl>
        <Button
          sx={{
            textDecoration: "underline",
            ":hover": { textDecoration: "underline" },
            color: colors.grey[700],
          }}
          onClick={() => {
            dispatch(setMbSearchBarOpen(false));
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};
