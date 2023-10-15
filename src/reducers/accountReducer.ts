import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getOrderAction, getUserOrdersAction } from "../actions/orderActions";
import { AccountReduxState, IAccountReduxState } from "../model/account";

const initialState: IAccountReduxState = new AccountReduxState();

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setMobileAccountMenuOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, mobileMenuOpen: payload.payload };
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
  },
});

export const { setMobileAccountMenuOpen } = accountSlice.actions;

export default accountSlice.reducer;
