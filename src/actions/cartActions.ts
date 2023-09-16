import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../controllers/clientRequest";
import { IAddToCartRequest, ICartItem } from "../model/cart";

export const getCartAction = createAsyncThunk<ICartItem[]>("getCart", () => {
  return getCartWorker()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
});

function getCartWorker(): Promise<ICartItem[]> {
  return getRequest<ICartItem[]>(`/carts`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addToCartAction = createAsyncThunk<string, IAddToCartRequest>(
  "addToCart",
  (data, thunkApi) => {
    return addToCartWorker(data)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => Promise.reject(err));
  }
);

function addToCartWorker(addToCartPostData: IAddToCartRequest) {
  return postRequest<string>(`/carts/add-to-cart`, addToCartPostData, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
