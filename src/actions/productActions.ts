import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, INewProductRequest, IProductFilter } from "../model/product";
import { getRequest, postRequest } from "../controllers/clientRequest";
import { IPaginationResponse } from "../model/common";

export const getProductsAction = createAsyncThunk<
  IPaginationResponse<IProduct>,
  IProductFilter
>("getProducts", (filter = {}) => {
  return fetchProductsWorker(filter)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
});

export function fetchProductsWorker(filter?: IProductFilter) {
  return getRequest<IPaginationResponse<IProduct>>("/products", {
    requestParams: filter,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const productsLoad = (filters: IProductFilter = {}) =>
  getProductsAction(filters);

export const getProductAction = createAsyncThunk<IProduct, string>(
  "getProduct",
  (productId) => {
    return getProductWorker(productId)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
);

function getProductWorker(productId: string) {
  return getRequest<IProduct>(`/products/${productId}`)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addProductAction = createAsyncThunk<IProduct, INewProductRequest>(
  "addProduct",
  (product, thunkApi) => {
    return addProductWorker(product)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
);

export function addProductWorker(product: INewProductRequest) {
  return postRequest<IProduct>("/products/", product, {
    auth: true,
    formData: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
