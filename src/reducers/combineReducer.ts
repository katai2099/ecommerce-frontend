import { combineReducers } from "@reduxjs/toolkit";
import { IMainState } from "../model/common";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import guiReducer from "./guiReducer";
import productSettingsReducer from "./productSettingsReducer";

const appReducer = combineReducers<IMainState>({
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
  gui: guiReducer,
  productSettings: productSettingsReducer,
});

export const rootReducer = appReducer;
export type RootState = ReturnType<typeof rootReducer>;
