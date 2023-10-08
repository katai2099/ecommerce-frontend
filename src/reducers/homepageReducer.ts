import { createSlice } from "@reduxjs/toolkit";
import {
  getFeaturedProductsAction,
  getTopCategoriesAction,
} from "../actions/productActions";
import { HomepageReduxState, IHomepageReduxState } from "../model/homepage";

const initialState: IHomepageReduxState = new HomepageReduxState();

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFeaturedProductsAction.pending, (state) => {
      return { ...state, featuredProductsLoading: true };
    });
    builder.addCase(getFeaturedProductsAction.fulfilled, (state, action) => {
      return {
        ...state,
        featuredProducts: action.payload,
        featuredProductsError: false,
        featuredProductsLoading: false,
      };
    });
    builder.addCase(getFeaturedProductsAction.rejected, (state) => {
      return {
        ...state,
        featuredProductsError: true,
        featuredProductsLoading: false,
      };
    });
    builder.addCase(getTopCategoriesAction.pending, (state) => {
      return { ...state, topCategoriesLoading: true };
    });
    builder.addCase(getTopCategoriesAction.fulfilled, (state, action) => {
      return {
        ...state,
        topCategories: action.payload,
        topCategoriesLoading: false,
        topCategoriesError: false,
      };
    });
    builder.addCase(getTopCategoriesAction.rejected, (state) => {
      return {
        ...state,
        topCategoriesError: true,
        topCategoriesLoading: false,
      };
    });
  },
  reducers: {},
});

export default homepageSlice.reducer;
