import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../controllers/clientRequest";
import { IOrderDetail } from "../model/order";
import { setLoading } from "../reducers/guiReducer";

export const getOrderAction = createAsyncThunk<IOrderDetail, string>(
  "get_order",
  (orderId, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return getOrderWorker(orderId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function getOrderWorker(orderId: string) {
  return getRequest<IOrderDetail>(`/orders/${orderId}`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
