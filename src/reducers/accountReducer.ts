import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getOrderAction,
  getUserOrdersAction,
  updateOrderStatusAction,
} from "../actions/orderActions";
import {
  addAddressAction,
  deleteAddressAction,
  getAddressesAction,
  setDefaultAddressAction,
  updateAddressAction,
} from "../actions/userActions";
import { AccountReduxState, IAccountReduxState } from "../model/account";
import { IOrderDetail, IOrderHistory } from "../model/order";
import { IAddress } from "../model/user";

const initialState: IAccountReduxState = new AccountReduxState();

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setMobileAccountMenuOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, mobileMenuOpen: payload.payload };
    },
    setAddresses(state, payload: PayloadAction<IAddress[]>) {
      return { ...state, addresses: payload.payload };
    },
    setAddressDialogOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, addressDialogOpen: payload.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserOrdersAction.fulfilled, (state, payload) => {
      const res = payload.payload;
      let orders;
      if (res.currentPage !== 1) {
        orders = [...state.orders, ...res.data];
      } else {
        orders = res.data;
      }
      return {
        ...state,
        orders: orders,
        orderLoading: false,
        orderError: false,
      };
    });
    builder.addCase(getUserOrdersAction.pending, (state) => {
      return { ...state, orderLoading: true, orderError: false };
    });
    builder.addCase(getUserOrdersAction.rejected, (state) => {
      return { ...state, orderLoading: false, orderError: true };
    });
    builder.addCase(getOrderAction.fulfilled, (state, payload) => {
      return {
        ...state,
        selectedOrder: payload.payload,
        selectedOrderLoading: false,
        selectedOrderError: false,
      };
    });
    builder.addCase(getOrderAction.pending, (state) => {
      return {
        ...state,
        selectedOrderLoading: true,
        selectedOrderError: false,
      };
    });
    builder.addCase(getOrderAction.rejected, (state) => {
      return {
        ...state,
        selectedOrderLoading: false,
        selectedOrderError: true,
      };
    });
    builder.addCase(getAddressesAction.fulfilled, (state, payload) => {
      return {
        ...state,
        addresses: payload.payload,
        addressesLoading: false,
        addressesError: false,
      };
    });
    builder.addCase(getAddressesAction.pending, (state) => {
      return { ...state, addressesLoading: true, addressesError: false };
    });
    builder.addCase(getAddressesAction.rejected, (state) => {
      return { ...state, addressesError: true, addressesLoading: false };
    });
    builder.addCase(setDefaultAddressAction.fulfilled, (state) => {
      return { ...state, addressesLoading: false };
    });
    builder.addCase(setDefaultAddressAction.pending, (state) => {
      return { ...state, addressesLoading: true };
    });
    builder.addCase(setDefaultAddressAction.rejected, (state) => {
      return { ...state, addressesLoading: false };
    });
    builder.addCase(addAddressAction.fulfilled, (state) => {
      return { ...state, addressesLoading: false, addressDialogOpen: false };
    });
    builder.addCase(addAddressAction.pending, (state) => {
      return { ...state, addressesLoading: true };
    });
    builder.addCase(addAddressAction.rejected, (state) => {
      return { ...state, addressesLoading: false };
    });
    builder.addCase(updateAddressAction.fulfilled, (state) => {
      return { ...state, addressesLoading: false, addressDialogOpen: false };
    });
    builder.addCase(updateAddressAction.pending, (state) => {
      return { ...state, addressesLoading: true };
    });
    builder.addCase(updateAddressAction.rejected, (state) => {
      return { ...state, addressesLoading: false };
    });
    builder.addCase(deleteAddressAction.fulfilled, (state) => {
      return { ...state, addressesLoading: false };
    });
    builder.addCase(deleteAddressAction.pending, (state) => {
      return { ...state, addressesLoading: true };
    });
    builder.addCase(deleteAddressAction.rejected, (state) => {
      return { ...state, addressesLoading: false };
    });
    builder.addCase(updateOrderStatusAction.fulfilled, (state, payload) => {
      const decodedStatus = decodeURI(payload.meta.arg.status);
      const updatedOrder = {
        ...state.selectedOrder.order,
        status: decodedStatus,
      };
      const newHistory: IOrderHistory = {
        id: 0,
        actionTime: new Date().toString(),
        status: decodedStatus,
      };
      const updatedHistories = [
        ...state.selectedOrder.orderHistories,
        newHistory,
      ];
      const updatedSelectedOrder: IOrderDetail = {
        ...state.selectedOrder,
        orderHistories: updatedHistories,
        order: updatedOrder,
      };
      return { ...state, selectedOrder: updatedSelectedOrder };
    });
  },
});

export const { setMobileAccountMenuOpen, setAddresses, setAddressDialogOpen } =
  accountSlice.actions;

export default accountSlice.reducer;
