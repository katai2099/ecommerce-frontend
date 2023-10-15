import { getOrderAction, getUserOrdersAction } from "../actions/orderActions";
import { store } from "../store/configureStore";

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
