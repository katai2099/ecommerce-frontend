import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIdName } from "../model/common";
import {
  IProductAttributesReduxState,
  ProductAttributesReduxState,
} from "../model/productAttributes";

const initialState: IProductAttributesReduxState =
  new ProductAttributesReduxState();

const productAttributesSlice = createSlice({
  name: "productSettings",
  initialState,
  reducers: {
    setCategories(state, payload: PayloadAction<IIdName[]>) {
      return { ...state, categories: payload.payload };
    },
  },
});

export const { setCategories } = productAttributesSlice.actions;
export default productAttributesSlice.reducer;
