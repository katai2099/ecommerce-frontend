import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartAction } from "../actions/cartActions";
import { clone } from "../controllers/utils";
import { CartReduxState, ICartItem, ICartReduxState } from "../model/cart";
import { IProduct } from "../model/product";

const initialState: ICartReduxState = new CartReduxState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpen(state, payload: PayloadAction<boolean>) {
      return { ...state, open: payload.payload };
    },
    addToCartState(
      state,
      payload: PayloadAction<{
        product: IProduct;
        cartItemId: number;
        sizeIndex: number;
      }>
    ) {
      const newCartItem = payload.payload.product;
      const existingCartItemIndex = state.carts.findIndex(
        (cartItem) => cartItem.id === payload.payload.cartItemId
      );
      if (existingCartItemIndex !== -1) {
        const updatedCarts = state.carts.map((item, idx) =>
          idx === existingCartItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, carts: updatedCarts };
      }
      const newCarts = clone(state.carts);
      const newItem: ICartItem = {
        id: payload.payload.cartItemId,
        quantity: 1,
        product: {
          ...newCartItem,
          productSizes: newCartItem.productSizes.filter(
            (item) =>
              item.size.name ===
              newCartItem.productSizes[payload.payload.sizeIndex].size.name
          ),
        },
      };
      newCarts.push(newItem);
      return { ...state, carts: newCarts };
    },
    updateCarts(state, payload: PayloadAction<ICartItem[]>) {
      return { ...state, carts: payload.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAction.fulfilled, (state, action) => {
      return { ...state, carts: action.payload };
    });
  },
});

export const { setOpen, addToCartState, updateCarts } = cartSlice.actions;
export default cartSlice.reducer;
