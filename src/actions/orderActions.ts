import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../controllers/clientRequest";
import {
  IConfirmPayment,
  INextActionResponse,
  IOrderDetail,
} from "../model/order";
import { setLoading } from "../reducers/guiReducer";

export const getOrderAction = createAsyncThunk<IOrderDetail, string>(
  "get_order",
  (orderId, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return getOrderWorker(orderId)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function getOrderWorker(orderId: string) {
  return getRequest<IOrderDetail>(`/orders/${orderId}`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const confirmPaymentAction = createAsyncThunk<
  INextActionResponse,
  IConfirmPayment
>("confirm_payment", (data) => {
  return confirmIntentWorker(data)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
});

function confirmIntentWorker(confirmPaymentRequest: IConfirmPayment) {
  return postRequest<INextActionResponse>(
    "/carts/confirm-intent",
    confirmPaymentRequest,
    {
      auth: true,
    }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
