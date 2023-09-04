import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { adminReduxState, IAdminReduxState } from "../model/admin";
import { IIdName } from "../model/common";

const initialState: IAdminReduxState = new adminReduxState();
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminSizes(state, action: PayloadAction<IIdName[]>) {
      state.sizes = action.payload;
      return state;
    },
    setAdminCategories(state, action: PayloadAction<IIdName[]>) {
      state.categories = action.payload;
      return state;
    },
  },
});

export const { setAdminSizes, setAdminCategories } = adminSlice.actions;
export default adminSlice.reducer;
