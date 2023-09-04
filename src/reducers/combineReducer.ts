import { combineReducers } from "@reduxjs/toolkit";
import { IMainState } from "../model/common";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

const appReducer = combineReducers<IMainState>({
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
});

export const rootReducer = appReducer;
export type RootState = ReturnType<typeof rootReducer>;
