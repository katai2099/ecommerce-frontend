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
    startNewFilter(state, payload: PayloadAction<{ key: string; value: any }>) {
      const { key, value } = payload.payload;
      const newFilter: IProductFilter = new Filter();
      const updatedFilter = { ...newFilter, [key]: value };
      return { ...state, filter: updatedFilter };
    },
  },
});

export const { setCategories, setProductFilter, startNewFilter } =
  productSettingsSlice.actions;
export default productSettingsSlice.reducer;
