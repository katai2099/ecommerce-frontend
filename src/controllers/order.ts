import { store } from "../store/configureStore";

import {
  getOrderAction,
  getOrderAnalyticAction,
  getOrdersAction,
  getRecentOrdersAction,
  getSaleAnalyticAction,
  getUserOrdersAction,
  updateOrderStatusAction,
} from "../actions/orderActions";
import { IOrderFilter, IOrderFilterParams } from "../model/order";
import { setLoading } from "../reducers/guiReducer";
import { processOrPredicate } from "./utils";

export function processOrderFilter(filter: IOrderFilter) {
  const filterParams: IOrderFilterParams = {};
  if (filter.page) {
    filterParams.page = filter.page;
  }
  if (filter.status && filter.status.length > 0) {
    filterParams.status = encodeURI(processOrPredicate<string>(filter.status));
  }
  return filterParams;
}

export function getOrderDetails(filter: IOrderFilter) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(getOrdersAction(filter))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function updateOrderStatus(orderId: string, status: string) {
  store.dispatch(setLoading(true));
  const encodedStatus = encodeURI(status);
  return store
    .dispatch(
      updateOrderStatusAction({ orderId: orderId, status: encodedStatus })
    )
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function getUserOrders(page: number = 1) {
  return store
    .dispatch(getUserOrdersAction(page))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getOrderDetail(orderId: string) {
  return store
    .dispatch(getOrderAction(orderId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getRecentOrders() {
  return store
    .dispatch(getRecentOrdersAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getOrderAnalytic() {
  return store
    .dispatch(getOrderAnalyticAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getSaleAnalytic() {
  return store
    .dispatch(getSaleAnalyticAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
