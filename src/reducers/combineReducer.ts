import {
  AnyAction,
  Reducer,
  combineReducers,
  createAction,
  createSlice,
} from "@reduxjs/toolkit";
import { logoutAction } from "../actions/userActions";
import { AccountReduxState } from "../model/account";
import { CartReduxState } from "../model/cart";
import { CheckoutReduxState } from "../model/checkout";
import { IMainState, MainState } from "../model/common";
import { GuiReduxState } from "../model/gui";
import {
  ProductDetailReduxState,
  ProductReviewReduxState,
} from "../model/product";
import { ProductAttributesReduxState } from "../model/productAttributes";
import { ProductListReduxState } from "../model/productList";
import { UserReduxtState } from "../model/user";
import { BASE_NAME } from "../store/configureStore";
import accountReducer from "./accountReducer";
import adminReducer from "./adminReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import guiReducer from "./guiReducer";
import homepageReducer from "./homepageReducer";
import productAttributesReducer from "./productAttributesReducer";
import productDetailReducer from "./productDetailReducer";
import productListReducer from "./productListReducer";
import productReducer from "./productReducer";
import productReviewReducer from "./productReviewReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers<IMainState>({
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
  gui: guiReducer,
  productAttributes: productAttributesReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  homepage: homepageReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  productReview: productReviewReducer,
  account: accountReducer,
});

const initialState: IMainState = new MainState();

export const rootSlice = createSlice({
  name: "root",
  reducers: {
    appReducer,
  },
  initialState,
});

// export const rootReducer = appReducer;

export const getAppInitialState = () => {
  const storedState = window.localStorage.getItem(BASE_NAME);
  if (storedState) {
    const initialState: IMainState = JSON.parse(storedState);
    const updatedInitialState: IMainState = {
      ...initialState,
      gui: new GuiReduxState(),
      cart: {
        ...initialState.cart,
        open: false,
        cartLoading: true,
        cartError: false,
      },
      productList: new ProductListReduxState(),
      checkout: new CheckoutReduxState(),
      productAttributes: new ProductAttributesReduxState(),
      productReview: new ProductReviewReduxState(),
      productDetail: new ProductDetailReduxState(),
      account: new AccountReduxState(),
    };
    return updatedInitialState;
  }
  return new MainState();
};

export const getLogoutState = (state: IMainState | undefined): IMainState => {
  if (state === undefined || state === null) {
    return new MainState();
  }
  return {
    ...state,
    cart: new CartReduxState(),
    user: new UserReduxtState(),
    checkout: new CheckoutReduxState(),
    account: new AccountReduxState(),
  };
};

export const setInitialState = createAction<{ state: IMainState }>(
  "SET_INITIAL_STATE"
);

export const rootReducer: Reducer<IMainState> = (
  state: IMainState | undefined,
  action: AnyAction
) => {
  if (action.type === "SET_INITIAL_STATE") {
    return action.payload.state;
  }
  if (logoutAction.fulfilled.match(action)) {
    return getLogoutState(state);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
