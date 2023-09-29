import { Address, IAddress } from "./user";

export interface ICheckoutReduxState {
  addresses: IAddress[];
  step: number;
  selectedDeliveryAddressIndex: number;
  selectedBillingAddressIndex: number;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  isBillingSameAsDelivery: boolean;
  nameOnCard: string;
  addressBookDialogOpen: boolean;
  isNewDeliveryAddress: boolean;
  isNewBillingAddress: boolean;
}

export class CheckoutReduxState implements ICheckoutReduxState {
  constructor(
    public addresses = [],
    public step = 0,
    public selectedDeliveryAddressIndex = 0,
    public selectedBillingAddressIndex = 0,
    public deliveryAddress = new Address(),
    public billingAddress = new Address(),
    public isBillingSameAsDelivery = true,
    public nameOnCard = "",
    public addressBookDialogOpen = false,
    public isNewDeliveryAddress = false,
    public isNewBillingAddress = false
  ) {}
}
