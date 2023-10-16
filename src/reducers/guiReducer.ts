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
    setMbGenderMenuOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, mbGenderMenuOpen: payload.payload };
    },
    setMbSearchBarOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, mbSearchBarOpen: payload.payload };
    },
  },
});

export const {
  setLoading,
  setSnackbarState,
  resetSnackbarState,
  setMbGenderMenuOpen,
  setMbSearchBarOpen,
} = guiSlice.actions;
export default guiSlice.reducer;
