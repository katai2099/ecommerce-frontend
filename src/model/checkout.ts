import { Address, IAddress, initializeAddressError } from "./user";

export interface ICheckoutReduxState {
  addresses: IAddress[];
  step: number;
  selectedDeliveryAddressIndex: number;
  selectedBillingAddressIndex: number;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  deliveryAddressError: Record<keyof IAddress, string>;
  billingAddressError: Record<keyof IAddress, string>;
  isBillingSameAsDelivery: boolean;
  nameOnCard: string;
  nameOnCardError: string;
  addressBookDialogOpen: boolean;
  isNewDeliveryAddress: boolean;
  isNewBillingAddress: boolean;
  firstLoad: boolean;
  checkoutPaymentError: string;
  placeOrderError: boolean;
}

export class CheckoutReduxState implements ICheckoutReduxState {
  constructor(
    public addresses = [],
    public step = 0,
    public selectedDeliveryAddressIndex = 0,
    public selectedBillingAddressIndex = 0,
    public deliveryAddress = new Address(),
    public billingAddress = new Address(),
    public deliveryAddressError = initializeAddressError(),
    public billingAddressError = initializeAddressError(),
    public isBillingSameAsDelivery = true,
    public nameOnCard = "",
    public nameOnCardError = "",
    public addressBookDialogOpen = false,
    public isNewDeliveryAddress = true,
    public isNewBillingAddress = true,
    public firstLoad = true,
    public checkoutPaymentError = "",
    public placeOrderError = false
  ) {}
}
