import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../controllers/clientRequest";
import {
  IAddToCartRequest,
  ICartItem,
  ICheckoutResponse,
  IPlaceOrderRequest,
  IStockCountCheck,
  IUpdateCartRequest,
} from "../model/cart";
import { setLoading } from "../reducers/guiReducer";

export const getCartAction = createAsyncThunk<ICartItem[]>(
  "get_cart",
  (_, thunkApi) => {
    return getCartWorker()
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function getCartWorker(): Promise<ICartItem[]> {
  return getRequest<ICartItem[]>(`/carts`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addToCartAction = createAsyncThunk<number, IAddToCartRequest>(
  "add_to_cart",
  (data, thunkApi) => {
    return addToCartWorker(data)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function addToCartWorker(addToCartPostData: IAddToCartRequest) {
  return postRequest<number>(`/carts/add-to-cart`, addToCartPostData, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateCartAction = createAsyncThunk<string, IUpdateCartRequest>(
  "update_cart",
  (data, thunkApi) => {
    return updateCartWorker(data)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function updateCartWorker(updateCartRequest: IUpdateCartRequest) {
  return putRequest<string>(
    `/carts/${updateCartRequest.cartItemId}`,
    updateCartRequest,
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const stockCheckAction = createAsyncThunk<IStockCountCheck[]>(
  "stock_check",
  (_, thunkApi) => {
    return stockCheckWorker()
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function stockCheckWorker() {
  return postRequest<IStockCountCheck[]>(
    "/carts/stock-check",
    {},
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const checkoutAction = createAsyncThunk("checkout", (_, thunkApi) => {
  thunkApi.dispatch(setLoading(true));
  return checkoutWorker()
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err))
    .finally(() => thunkApi.dispatch(setLoading(false)));
});

function checkoutWorker() {
  return postRequest<ICheckoutResponse>("/carts/checkout", {}, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}

export const placeOrderAction = createAsyncThunk<string, IPlaceOrderRequest>(
  "place_order",
  (placeOrderRequest, thunkApi) => {
    return placeOrderWorker(placeOrderRequest)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function placeOrderWorker(placeOrderRequest: IPlaceOrderRequest) {
  return postRequest<string>("/carts/place-order", placeOrderRequest, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
