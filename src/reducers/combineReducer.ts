import {
  AnyAction,
  Reducer,
  combineReducers,
  createAction,
  createSlice,
} from "@reduxjs/toolkit";
import { IMainState, MainState } from "../model/common";
import adminReducer from "./adminReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import guiReducer from "./guiReducer";
import productReducer from "./productReducer";
import productSettingsReducer from "./productSettingsReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers<IMainState>({
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
  gui: guiReducer,
  productSettings: productSettingsReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
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

export const setInitialState = createAction<{ state: IMainState }>(
  "SET_INITIAL_STATE"
);

export const rootReducer: Reducer<IMainState> = (
  state: IMainState | undefined,
  action: AnyAction
) => {
  switch (action.type) {
    case "SET_INITIAL_STATE": {
      return action.payload.state;
    }
    //   if (logout.async.done.match(action)) {
    //     state = clone(new MainState());
    // }
    default:
      return appReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
