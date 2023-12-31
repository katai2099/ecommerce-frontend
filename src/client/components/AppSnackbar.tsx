import { Alert, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { resetSnackbarState } from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";

export const AppSnackbar = () => {
  const guiState = useSelector((state: RootState) => state.gui);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Snackbar
      open={guiState.showSnackbar}
      anchorOrigin={{
        vertical: matchMobile ? "bottom" : guiState.snackbarVerticalPos,
        horizontal: guiState.snackbarHorizontalPos,
      }}
      autoHideDuration={5000}
      onClose={() => {
        dispatch(resetSnackbarState());
      }}
      sx={{ minWidth: "15%", mt: "50px" }}
    >
      <Alert
        severity={guiState.snackbarSevirity}
        onClose={() => {
          dispatch(resetSnackbarState());
        }}
        sx={{ width: "100%" }}
        variant="filled"
        elevation={6}
      >
        {guiState.snackbarText}
      </Alert>
    </Snackbar>
  );
};
