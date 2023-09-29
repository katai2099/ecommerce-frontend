import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckoutReduxState, ICheckoutReduxState } from "../model/checkout";
import { IAddress } from "../model/user";

const initialState: ICheckoutReduxState = new CheckoutReduxState();

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setNameOnCard(state, action: PayloadAction<string>) {
      return { ...state, nameOnCard: action.payload };
    },
    setSelectedDeliveryAddressIndex(state, action: PayloadAction<number>) {
      return { ...state, selectedDeliveryAddressIndex: action.payload };
    },
    setSelectedBillingAddressIndex(state, action: PayloadAction<number>) {
      return { ...state, selectedBillingAddressIndex: action.payload };
    },
    setAddresses(state, action: PayloadAction<IAddress[]>) {
      return { ...state, addresses: action.payload };
    },
    setDeliveryAddress(state, action: PayloadAction<IAddress>) {
      return { ...state, deliveryAddress: action.payload };
    },
    setBillingAddress(state, action: PayloadAction<IAddress>) {
      return { ...state, billingAddress: action.payload };
    },
    setStep(state, action: PayloadAction<number>) {
      return { ...state, step: action.payload };
    },
    setIsBillingSameAsDelivery(state, action: PayloadAction<boolean>) {
      return { ...state, isBillingSameAsDelivery: action.payload };
    },
    setAddressBookDialogOpen(state, action: PayloadAction<boolean>) {
      return { ...state, addressBookDialogOpen: action.payload };
    },
    setIsNewDeliveryAddress(state, action: PayloadAction<boolean>) {
      return { ...state, isNewDeliveryAddress: action.payload };
    },
    setIsNewBillingAddress(state, action: PayloadAction<boolean>) {
      return { ...state, isNewBillingAddress: action.payload };
    },
    resetCheckoutState() {
      return new CheckoutReduxState();
    },
  },
});

export const {
  setNameOnCard,
  setSelectedDeliveryAddressIndex,
  setSelectedBillingAddressIndex,
  setAddresses,
  setDeliveryAddress,
  setBillingAddress,
  setStep,
  setIsBillingSameAsDelivery,
  resetCheckoutState,
  setAddressBookDialogOpen,
  setIsNewDeliveryAddress,
  setIsNewBillingAddress,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
