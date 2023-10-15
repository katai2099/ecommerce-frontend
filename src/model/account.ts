import { IOrder, IOrderDetail, OrderDetail } from "./order";
import { IAddress } from "./user";

export interface IAccountReduxState {
  orders: IOrder[];
  orderLoading: boolean;
  orderError: boolean;
  selectedOrder: IOrderDetail;
  selectedOrderLoading: boolean;
  selectedOrderError: boolean;
  addresses: IAddress[];
  addressesLoading: boolean;
  addressesError: boolean;
  addressDialogOpen: boolean;
  mobileMenuOpen: boolean;
}

export class AccountReduxState implements IAccountReduxState {
  constructor(
    public orders = [],
    public orderLoading = true,
    public orderError = false,
    public selectedOrder = new OrderDetail(),
    public selectedOrderLoading = true,
    public selectedOrderError = false,
    public addresses = [],
    public addressesLoading = true,
    public addressesError = false,
    public addressDialogOpen = false,
    public mobileMenuOpen = false
  ) {}
}
