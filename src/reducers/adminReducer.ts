import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminReduxState, IAdminReduxState } from "../model/admin";
import { ICategory } from "../model/category";
import { ISize } from "../model/size";

const initialState: IAdminReduxState = new adminReduxState();
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminSizes(state, action: PayloadAction<ISize[]>) {
      return { ...state, sizes: action.payload };
    },
    setAdminCategories(state, action: PayloadAction<ICategory[]>) {
      return { ...state, categories: action.payload };
    },
    addAdminSizes(state, action: PayloadAction<ISize>) {
      return { ...state, sizes: [...state.sizes, action.payload] };
    },
  },
});

export const { setAdminSizes, setAdminCategories, addAdminSizes } =
  adminSlice.actions;
export default adminSlice.reducer;
