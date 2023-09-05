import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIdName } from "../model/common";
import { IProductFilter } from "../model/product";
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
      return { ...state, productFilter: payload.payload };
    },
  },
});

export const { setCategories, setProductFilter } = productSettingsSlice.actions;
export default productSettingsSlice.reducer;
