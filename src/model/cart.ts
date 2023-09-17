import { IProduct } from "./product";

export interface ICartReduxState {
  carts: ICartItem[];
  open: boolean;
}

export class CartReduxState implements ICartReduxState {
  constructor(public carts: ICartItem[] = [], public open: boolean = false) {}
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
