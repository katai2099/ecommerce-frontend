import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addCategoryAction,
  updateCategoryAction,
} from "../actions/productActions";
import {
  AdminMode,
  CategoryReduxState,
  ICategoryReduxState,
} from "../model/admin";
import { ICategory } from "../model/category";

const initialState: ICategoryReduxState = new CategoryReduxState();

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<ICategory>) {
      return { ...state, selectedCategory: action.payload };
    },
    setEditedCategory(state, action: PayloadAction<ICategory>) {
      return { ...state, editedCategory: action.payload };
    },
    setCategoryMode(state, action: PayloadAction<AdminMode>) {
      return { ...state, mode: action.payload };
    },
    setCategoryLoading(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    resetCategoryState() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      const category: ICategory = action.payload;
      return {
        ...state,
        selectedCategory: category,
        editedCategory: category,
        loading: false,
        mode: AdminMode.VIEW,
      };
    });
    builder.addCase(addCategoryAction.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addCategoryAction.rejected, (state) => {
      return { ...state, loading: false };
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      const category: ICategory = action.payload;
      return {
        ...state,
        selectedCategory: category,
        editedCategory: category,
        loading: false,
        mode: AdminMode.VIEW,
      };
    });
    builder.addCase(updateCategoryAction.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateCategoryAction.rejected, (state) => {
      return { ...state, loading: false };
    });
  },
});

export const {
  setCategoryMode,
  setSelectedCategory,
  setEditedCategory,
  resetCategoryState,
  setCategoryLoading,
} = categorySlice.actions;
export default categorySlice.reducer;
