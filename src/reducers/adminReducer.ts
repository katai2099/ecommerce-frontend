import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminReduxState, IAdminReduxState } from "../model/admin";
import { ICategory } from "../model/category";
import { IIdName } from "../model/common";

const initialState: IAdminReduxState = new adminReduxState();
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminSizes(state, action: PayloadAction<IIdName[]>) {
      return { ...state, sizes: action.payload };
    },
    setAdminCategories(state, action: PayloadAction<ICategory[]>) {
      return { ...state, categories: action.payload };
    },
  },
});

export const { setAdminSizes, setAdminCategories } = adminSlice.actions;
export default adminSlice.reducer;
