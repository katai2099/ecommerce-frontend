import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../controllers/clientRequest";
import {
  IAddToCartRequest,
  ICartItem,
  IUpdateCartRequest,
} from "../model/cart";
import { setLoading } from "../reducers/guiReducer";

export const getCartAction = createAsyncThunk<ICartItem[]>("get_cart", () => {
  return getCartWorker()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
});

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
      .catch((err) => Promise.reject(err));
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
    thunkApi.dispatch(setLoading(true));
    return updateCartWorker(data)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
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
