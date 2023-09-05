import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, INewProductRequest, IProductFilter } from "../model/product";
import { getRequest, postRequest } from "../controllers/clientRequest";
import { IPaginationResponse } from "../model/common";
import { setLoading } from "../reducers/guiReducer";
import { processProductFilter } from "../controllers/product";

export const getProductsAction = createAsyncThunk<
  IPaginationResponse<IProduct>,
  IProductFilter
>(
  "getProducts",
  (
    filter = {
      category: [],
      gender: [],
    },
    thunkApi
  ) => {
    thunkApi.dispatch(setLoading(true));
    return fetchProductsWorker(filter)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err))
      .finally(() => {
        thunkApi.dispatch(setLoading(false));
      });
  }
);

export function fetchProductsWorker(filter: IProductFilter) {
  const filterParams = processProductFilter(filter);
  return getRequest<IPaginationResponse<IProduct>>("/products", {
    requestParams: filterParams,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const productsLoad = (
  filters: IProductFilter = {
    category: [],
    gender: [],
  }
) => getProductsAction(filters);

export const getProductAction = createAsyncThunk<IProduct, string>(
  "getProduct",
  (productId, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return getProductWorker(productId)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err))
      .finally(() => {
        thunkApi.dispatch(setLoading(false));
      });
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
