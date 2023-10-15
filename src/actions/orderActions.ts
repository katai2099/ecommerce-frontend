import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../controllers/clientRequest";
import { IPaginationResponse } from "../model/common";
import { IOrder, IOrderDetail, IOrderFilterParams } from "../model/order";

export const getUserOrdersAction = createAsyncThunk<
  IPaginationResponse<IOrder>,
  number
>("get_users_order", (page, thunkApi) => {
  return getUserOrdersWorker(page)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function getUserOrdersWorker(page: number) {
  const ordersFilter: IOrderFilterParams = { page: page };
  return getRequest<IPaginationResponse<IOrder>>("/orders/user/", {
    auth: true,
    requestParams: ordersFilter,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getOrderAction = createAsyncThunk<IOrderDetail, string>(
  "get_order",
  (orderId, thunkApi) => {
    return getOrderWorker(orderId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function getOrderWorker(orderId: string) {
  return getRequest<IOrderDetail>(`/orders/${orderId}`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
