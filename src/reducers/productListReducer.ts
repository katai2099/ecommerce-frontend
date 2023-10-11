import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Filter, IProductFilter } from "../model/product";
import {
  IProductListReduxState,
  ProductListReduxState,
} from "../model/productList";

const initialState: IProductListReduxState = new ProductListReduxState();

const productListSlice = createSlice({
  name: "product_list",
  initialState,
  reducers: {
    setProductsFilter(state, payload: PayloadAction<IProductFilter>) {
      return { ...state, filter: payload.payload };
    },
    startNewFilter(state, payload: PayloadAction<{ key: string; value: any }>) {
      const { key, value } = payload.payload;
      const newFilter: IProductFilter = new Filter();
      const updatedFilter = { ...newFilter, [key]: value };
      return {
        ...state,
        filter: updatedFilter,
        ...(key === "category" && { isTopCategory: true, isSearch: true }),
        ...(key === "q" && { isSearch: true }),
        ...(key === "gender" && { isSearch: false, isTopCategory: false }),
      };
    },
    setMobileFilterDrawerOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, mobileFilterDrawerOpen: payload.payload };
    },
    setIsSearch(state, payload: PayloadAction<boolean>) {
      return { ...state, isSearch: payload.payload };
    },
    setTopCategory(state, payload: PayloadAction<boolean>) {
      return { ...state, isTopCategory: payload.payload };
    },
    resetSearchFilter(state) {
      const resetFilter: IProductFilter = {
        ...state.filter,
        category: [],
        gender: [],
        pmin: undefined,
        pmax: undefined,
        rating: 0,
      };
      return { ...state, filter: resetFilter };
    },
    resetGenderSectionFilter(state) {
      const resetFilter: IProductFilter = {
        ...state.filter,
        category: [],
        pmin: undefined,
        pmax: undefined,
        rating: 0,
      };
      return { ...state, filter: resetFilter };
    },
  },
});

export const {
  setProductsFilter,
  startNewFilter,
  setMobileFilterDrawerOpen,
  setTopCategory,
  setIsSearch,
  resetSearchFilter,
  resetGenderSectionFilter,
} = productListSlice.actions;
export default productListSlice.reducer;
