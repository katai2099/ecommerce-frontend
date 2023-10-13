import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GuiReduxState, IGuiReduxState, ISnackbarProps } from "../model/gui";

const initialState: IGuiReduxState = new GuiReduxState();

const guiSlice = createSlice({
  name: "gui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    setSnackbarState(state, action: PayloadAction<ISnackbarProps>) {
      return { ...state, ...action.payload };
    },
    resetSnackbarState(state) {
      return {
        ...state,
        showSnackbar: false,
        snackbarText: "",
      };
    },
  },
});

export const { setLoading, setSnackbarState, resetSnackbarState } =
  guiSlice.actions;
export default guiSlice.reducer;
