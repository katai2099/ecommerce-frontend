import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addProductAction,
  updateProductAction,
} from "../actions/productActions";
import {
  INewProductError,
  IProduct,
  IProductReduxState,
  NewProductError,
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
    setNewProductError(state, action: PayloadAction<INewProductError>) {
      return { ...state, newProductError: action.payload };
    },
    resetProductState() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(addProductAction.fulfilled, (state, payload) => {
      const newProduct = payload.payload;
      return {
        ...state,
        selectedProduct: newProduct,
        editedProduct: newProduct,
        mode: ProductMode.VIEW,
        newProductError: new NewProductError(),
      };
    });
    builder.addCase(updateProductAction.fulfilled, (state, payload) => {
      return {
        ...state,
        selectedProduct: payload.payload,
        editedProduct: payload.payload,
        mode: ProductMode.VIEW,
        NewProductError: new NewProductError(),
      };
    });
  },
  initialState: initialState,
});

export const {
  setSelectedProduct,
  setEditedProduct,
  setProductMode,
  setProductSubmitData,
  resetProductState,
  setNewProductError,
} = productSlice.actions;
export default productSlice.reducer;
