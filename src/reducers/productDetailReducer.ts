import { createSlice } from "@reduxjs/toolkit";
import { getProductAction } from "../actions/productActions";
import {
  IProductDetailReduxState,
  ProductDetailReduxState,
} from "../model/product";

const initialState: IProductDetailReduxState = new ProductDetailReduxState();

const productDetailSlice = createSlice({
  name: "product_detail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductAction.fulfilled, (state, payload) => {
      return { product: payload.payload, isError: false, isLoading: false };
    });
    builder.addCase(getProductAction.pending, (state) => {
      return { ...state, isLoading: true, isError: false };
    });
    builder.addCase(getProductAction.rejected, (state) => {
      return { ...state, isError: true, isLoading: false };
    });
  },
});

export default productDetailSlice.reducer;
