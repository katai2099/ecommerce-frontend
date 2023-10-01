import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import { resetSnackbarState } from "../../reducers/guiReducer";
import { useAppDispatch } from "../../store/configureStore";

export const AppSnackbar = () => {
  const guiState = useSelector((state: RootState) => state.gui);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      open={guiState.showSnackbar}
      anchorOrigin={{
        vertical: guiState.snackbarVerticalPos,
        horizontal: guiState.snackbarHorizontalPos,
      }}
      autoHideDuration={6000}
      onClose={() => {
        dispatch(resetSnackbarState());
      }}
      sx={{ minWidth: "15%", mt: "50px", mr: "10px" }}
    >
      <Alert
        severity="error"
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
