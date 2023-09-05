import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/combineReducer";

export const LoadingBackDrop = () => {
  const loading = useSelector((state: RootState) => state.gui.loading);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 3000 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
