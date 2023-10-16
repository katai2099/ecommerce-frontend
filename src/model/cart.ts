import { IProduct } from "./product";
import { IAddress } from "./user";

export interface ICartReduxState {
  carts: ICartItem[];
  open: boolean;
  isUpdate: boolean;
  cartLoading: boolean;
  cartError: boolean;
}

export class CartReduxState implements ICartReduxState {
  constructor(
    public carts: ICartItem[] = [],
    public open: boolean = false,
    public isUpdate = false,
    public cartLoading = true,
    public cartError = false
  ) {}
}

export interface ICartItem {
  id: number;
  quantity: number;
  product: IProduct;
}

export interface IAddToCartRequest {
  productId: number;
  size: string;
}

export interface IUpdateCartRequest {
  cartItemId: number;
  quantity: number;
}

export interface CreatePaymentResponse {
  clientSecret: string;
}

export interface IPlaceOrderRequest {
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  stripePaymentIntentId: string;
}

export interface ICheckoutResponse {
  carts: ICartItem[];
  total: number;
}

export interface IStockCountCheck {
  cartItemId: number;
  stockCount: number;
}
