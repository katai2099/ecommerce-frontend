import { Address, IAddress } from "./user";

interface IOrder {
  id: string;
  status: string;
  orderDate: string;
  totalPrice: number;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  orderDetails: IOrderSummary[];
}

class Order implements IOrder {
  constructor(
    public id = "",
    public status = "",
    public orderDate = "",
    public totalPrice = 0,
    public deliveryAddress = new Address(),
    public billingAddress = new Address(),
    public orderDetails = []
  ) {}
}

export interface IOrderSummary {
  productId: number;
  productName: string;
  productImg: string;
  quantity: number;
  priceAtPurchase: number;
  sizeLabel: string;
}

interface IOrderDetailUser {
  firstname: string;
  lastname: string;
  email: string;
}

class OrderDetailUser implements IOrderDetailUser {
  constructor(public firstname = "", public lastname = "", public email = "") {}
}

export interface IOrderDetail {
  order: IOrder;
  user: IOrderDetailUser;
}

export class OrderDetail implements IOrderDetail {
  constructor(
    public order = new Order(),
    public user = new OrderDetailUser()
  ) {}
}

export interface IConfirmPayment {
  paymentMethodId: string;
}

export interface INextActionResponse {
  status: string;
  clientSecret: string;
}
