import { combineReducers } from "@reduxjs/toolkit";
import { IMainState } from "../model/common";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import guiReducer from "./guiReducer";
import productSettingsReducer from "./productSettingsReducer";
import cartReducer from "./cartReducer";

const appReducer = combineReducers<IMainState>({
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
  gui: guiReducer,
  productSettings: productSettingsReducer,
  cart: cartReducer,
});

export const rootReducer = appReducer;
export type RootState = ReturnType<typeof rootReducer>;
