import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCategoryAction,
  updateCategoryAction,
} from "../actions/productActions";
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
  extraReducers(builder) {
    builder.addCase(addCategoryAction.fulfilled, (state, payload) => {
      return { ...state, categories: [...state.categories, payload.payload] };
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, payload) => {
      const updatedCategories = state.categories.map((category) =>
        category.id === payload.payload.id ? payload.payload : category
      );
      return { ...state, categories: updatedCategories };
    });
  },
});

export const { setAdminSizes, setAdminCategories, addAdminSizes } =
  adminSlice.actions;
export default adminSlice.reducer;
