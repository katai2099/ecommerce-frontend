import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IProduct,
  IProductReduxState,
  ProductMode,
  ProductReduxState,
} from "../model/product";

const initialState: IProductReduxState = new ProductReduxState();

export const productSlice = createSlice({
  name: "product",
  reducers: {
    setSelectedProduct(state, action: PayloadAction<IProduct>) {
      return { ...state, selectedProduct: action.payload };
    },
    setEditedProduct(state, action: PayloadAction<IProduct>) {
      return { ...state, editedProduct: action.payload };
    },
    setProductMode(state, action: PayloadAction<ProductMode>) {
      return { ...state, mode: action.payload };
    },
    setProductSubmitData(state, action: PayloadAction<boolean>) {
      return { ...state, submitData: action.payload };
    },
    resetProductState() {
      return initialState;
    },
  },
  initialState: initialState,
});

export const {
  setSelectedProduct,
  setEditedProduct,
  setProductMode,
  setProductSubmitData,
  resetProductState,
} = productSlice.actions;
export default productSlice.reducer;
