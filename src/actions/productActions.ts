import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../controllers/clientRequest";
import { processProductFilter } from "../controllers/product";
import { IPaginationResponse } from "../model/common";
import { INewProductRequest, IProduct, IProductFilter } from "../model/product";
import { INewReview, IProductReview } from "../model/review";
import { setLoading } from "../reducers/guiReducer";

export const getProductsAction = createAsyncThunk<
  IPaginationResponse<IProduct>,
  IProductFilter
>(
  "get_products",
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

function fetchProductsWorker(filter: IProductFilter) {
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
  "get_product",
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
  "add_product",
  (product, thunkApi) => {
    return addProductWorker(product)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
);

function addProductWorker(product: INewProductRequest) {
  return postRequest<IProduct>("/products/", product, {
    auth: true,
    formData: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getProductReviewsAction = createAsyncThunk<
  IProductReview,
  { productId: number; page: number }
>("get_product_review", (data) => {
  return getProductReviewsWorker(data.productId, data.page)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
});

function getProductReviewsWorker(productId: number, page: number = 1) {
  return getRequest<IProductReview>(
    `/products/${productId}/reviews?page=${page}`,
    {
      auth: localStorage.getItem("jwt") !== null ? true : false,
    }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const submitReviewAction = createAsyncThunk<
  string,
  { productId: number; newReview: INewReview }
>("put_new_review", (data, thunkApi) => {
  thunkApi.dispatch(setLoading(true));
  return submitReviewWorker(data.productId, data.newReview)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => {
      thunkApi.dispatch(setLoading(false));
    });
});

function submitReviewWorker(productId: number, newReview: INewReview) {
  return putRequest<string>(`/products/${productId}/reviews`, newReview, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
