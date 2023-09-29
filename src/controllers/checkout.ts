import { checkoutAction } from "../actions/cartActions";
import { ICheckoutResponse } from "../model/cart";
import { store } from "../store/configureStore";

export function getCheckoutData(): Promise<ICheckoutResponse> {
  return store
    .dispatch(checkoutAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
