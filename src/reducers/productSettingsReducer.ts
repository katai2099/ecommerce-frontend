import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIdName } from "../model/common";
import { Filter, Gender, IProductFilter } from "../model/product";
import {
  IProductSettingsReduxState,
  ProductSettingsReduxState,
} from "../model/productSettings";

const initialState: IProductSettingsReduxState =
  new ProductSettingsReduxState();

const productSettingsSlice = createSlice({
  name: "productSettings",
  initialState,
  reducers: {
    setCategories(state, payload: PayloadAction<IIdName[]>) {
      return { ...state, categories: payload.payload };
    },
    setProductFilter(state, payload: PayloadAction<IProductFilter>) {
      return { ...state, filter: payload.payload };
    },
    setGenderFilter(state, payload: PayloadAction<Gender>) {
      const newFilter: IProductFilter = new Filter();
      newFilter.gender = [payload.payload];
      return { ...state, filter: newFilter };
    },
  },
});

export const { setCategories, setProductFilter, setGenderFilter } =
  productSettingsSlice.actions;
export default productSettingsSlice.reducer;
