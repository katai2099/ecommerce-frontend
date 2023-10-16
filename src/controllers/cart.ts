import {
  confirmPaymentAction,
  getCartAction,
  placeOrderAction,
  stockCheckAction,
  updateCartAction,
} from "../actions/cartActions";
import { ICartItem, IPlaceOrderRequest, IStockCountCheck } from "../model/cart";
import { IAddress } from "../model/user";
import { store } from "../store/configureStore";

import axios, { AxiosError } from "axios";
import { checkoutAction } from "../actions/cartActions";
import { resetCart, setIsUpdate, updateCarts } from "../reducers/cartReducer";
import { setLoading } from "../reducers/guiReducer";
import { showSnackBar } from "./utils";

export function getCart() {
  store.dispatch(getCartAction());
}

export function removeItemFromCart(
  cartItemId: number,
  currentCart: ICartItem[],
  cartItemIndex: number,
  sideBarUpdate: boolean = false
) {
  sideBarUpdate
    ? store.dispatch(setIsUpdate(true))
    : store.dispatch(setLoading(true));
  store
    .dispatch(updateCartAction({ quantity: 0, cartItemId: cartItemId }))
    .unwrap()
    .then(() => {
      const updatedCarts = currentCart.filter(
        (_, idx) => idx !== cartItemIndex
      );
      store.dispatch(updateCarts(updatedCarts));
      showSnackBar("Removed from cart", "success");
    })
    .catch((err) => {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        showSnackBar(err.response.data.message, "error");
      } else {
        showSnackBar("something went wrong", "error");
      }
    })
    .finally(() => {
      sideBarUpdate
        ? store.dispatch(setIsUpdate(false))
        : store.dispatch(setLoading(false));
    });
}

export function updateCart(
  quantity: number,
  cartItemId: number,
  currentCart: ICartItem[],
  cartItemIndex: number,
  sideBarUpdate: boolean = false
) {
  sideBarUpdate
    ? store.dispatch(setIsUpdate(true))
    : store.dispatch(setLoading(true));
  store
    .dispatch(updateCartAction({ quantity, cartItemId: cartItemId }))
    .unwrap()
    .then(() => {
      const updatedCarts = currentCart.map((cartItem, idx) =>
        idx === cartItemIndex ? { ...cartItem, quantity: quantity } : cartItem
      );
      store.dispatch(updateCarts(updatedCarts));
      showSnackBar("Cart updated", "success");
    })
    .catch((err) => {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        showSnackBar(err.response.data.message, "error");
      } else {
        showSnackBar("something went wrong", "error");
      }
    })
    .finally(() => {
      sideBarUpdate
        ? store.dispatch(setIsUpdate(false))
        : store.dispatch(setLoading(false));
    });
}

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
    .then((res) => {
      store.dispatch(resetCart());
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));
}

export function stockCheck(): Promise<IStockCountCheck[]> {
  return store
    .dispatch(stockCheckAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function confirmPayment(paymentMethodId: string) {
  return store
    .dispatch(confirmPaymentAction({ paymentMethodId: paymentMethodId }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
