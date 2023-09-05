import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GuiReduxState, IGuiReduxState } from "../model/gui";

const initialState: IGuiReduxState = new GuiReduxState();

const guiSlice = createSlice({
  name: "gui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setLoading } = guiSlice.actions;
export default guiSlice.reducer;
