import { HeadCell } from "../admin/style/common";
import { Address, IAddress } from "./user";

export interface IOrder {
  id: string;
  status: string;
  orderDate: string;
  totalPrice: number;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  orderDetails: IOrderSummary[];
}

export class Order implements IOrder {
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

export interface IOrderHistory {
  id: number;
  actionTime: string;
  status: string;
}

export interface IOrderDetail {
  order: IOrder;
  user: IOrderDetailUser;
  orderHistories: IOrderHistory[];
}

export class OrderDetail implements IOrderDetail {
  constructor(
    public order = new Order(),
    public user = new OrderDetailUser(),
    public orderHistories = []
  ) {}
}

export interface IConfirmPayment {
  paymentMethodId: string;
}

export interface INextActionResponse {
  status: string;
  clientSecret: string;
}

export interface IOrderFilter {
  status?: string[];
  page?: number;
}

export interface IOrderFilterParams {
  status?: string;
  page?: number;
}

export interface IOrderAnalytic {
  totalSales: number;
  todaySales: number;
  totalOrders: number;
  todayOrders: number;
  oldestOrderDate: string;
}

export class OrderAnalytic implements IOrderAnalytic {
  constructor(
    public totalSales = 0,
    public todaySales = 0,
    public totalOrders = 0,
    public todayOrders = 0,
    public oldestOrderDate = ""
  ) {}
}

export interface IMonthlySaleData {
  totalSales: number;
  month: number;
  year: number;
}

export interface IWeeklySaleData {
  totalSales: number;
  dayOfWeek: number;
}

export interface ISaleAnalytic {
  weeklySaleData: IWeeklySaleData[];
  monthlySaleData: IMonthlySaleData[];
}

export class SaleAnalytic implements ISaleAnalytic {
  constructor(public weeklySaleData = [], public monthlySaleData = []) {}
}

export const orderTableHeadCells: readonly HeadCell[] = [
  {
    label: "Id",
  },
  {
    label: "Customer",
  },
  {
    label: "Date",
  },
  {
    label: "Status",
  },
  {
    label: "Items",
  },
  {
    label: "Price",
  },
];
