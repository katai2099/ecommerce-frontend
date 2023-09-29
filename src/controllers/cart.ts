import { placeOrderAction } from "../actions/cartActions";
import { IPlaceOrderRequest } from "../model/cart";
import { IAddress } from "../model/user";
import { store } from "../store/configureStore";

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
