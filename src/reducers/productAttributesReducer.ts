import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProductAttributesCategoriesAction } from "../actions/productSettingsActions";
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
  extraReducers(builder) {
    builder.addCase(fetchProductAttributesCategoriesAction.pending, (state) => {
      return { ...state, categoriesLoading: true };
    });
    builder.addCase(
      fetchProductAttributesCategoriesAction.fulfilled,
      (state) => {
        return { ...state, categoriesLoading: false, categoriesError: false };
      }
    );
    builder.addCase(
      fetchProductAttributesCategoriesAction.rejected,
      (state) => {
        return { ...state, categoriesLoading: false, categoriesError: true };
      }
    );
  },
});

export const { setCategories } = productAttributesSlice.actions;
export default productAttributesSlice.reducer;
