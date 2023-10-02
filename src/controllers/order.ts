import { getOrderAction, getUserOrdersAction } from "../actions/orderActions";
import { setLoading } from "../reducers/guiReducer";
import { store } from "../store/configureStore";

export function getUserOrders(page: number = 1) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(getUserOrdersAction(page))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function getOrderDetail(orderId: string) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(getOrderAction(orderId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}
