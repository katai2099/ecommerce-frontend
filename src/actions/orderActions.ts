import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../controllers/clientRequest";
import { processOrderFilter } from "../controllers/order";
import { IPaginationResponse } from "../model/common";
import {
  IOrder,
  IOrderDetail,
  IOrderFilter,
  IOrderFilterParams,
} from "../model/order";

export const getOrdersAction = createAsyncThunk<
  IPaginationResponse<IOrderDetail>,
  IOrderFilter
>("get_orders", (filter, thunkApi) => {
  return getOrdersWorker(filter)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function getOrdersWorker(orderFilter: IOrderFilter) {
  const filterParams = processOrderFilter(orderFilter);
  return getRequest<IPaginationResponse<IOrderDetail>>("/orders", {
    auth: true,
    requestParams: filterParams,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateOrderStatusAction = createAsyncThunk<
  string,
  { orderId: string; status: string }
>("update_order_status", (data, thunkApi) => {
  return updateOrderStatusWorker(data.orderId, data.status)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
});

function updateOrderStatusWorker(orderId: string, status: string) {
  return postRequest<string>(
    `/orders/${orderId}?status=${status}`,
    {},
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

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
