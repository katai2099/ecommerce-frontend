import { placeOrderAction, stockCheckAction } from "../actions/cartActions";
import { IPlaceOrderRequest, IStockCountCheck } from "../model/cart";
import { IAddress } from "../model/user";
import { store } from "../store/configureStore";

import { AxiosError } from "axios";
import { checkoutAction } from "../actions/cartActions";

export function getCheckoutData() {
  return store
    .dispatch(checkoutAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}

export function placeOrder(
  deliveryAddress: IAddress,
  billingAddress: IAddress,
  stripePaymentId: string
): Promise<string> {
  const placeOrderRequest: IPlaceOrderRequest = {
    billingAddress,
    deliveryAddress,
    stripePaymentIntentId: stripePaymentId,
  };
  return store
    .dispatch(placeOrderAction(placeOrderRequest))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function stockCheck(): Promise<IStockCountCheck[]> {
  return store
    .dispatch(stockCheckAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
