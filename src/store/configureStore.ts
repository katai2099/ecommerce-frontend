import { Middleware, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { IMainState } from "../model/common";
import { rootReducer } from "../reducers/combineReducer";

export const BASE_NAME = "storedState_";

const saveStateToLocalStore: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    let deployDate = "";
    const deployDateFromLocalStorage = getLocalDeployDate();
    if (deployDateFromLocalStorage) {
      deployDate = deployDateFromLocalStorage;
      window.localStorage.setItem(
        `${BASE_NAME}${deployDate}`,
        JSON.stringify(getState())
      );
      return returnValue;
    } else {
      const date = new Date();
      window.localStorage.setItem(
        `${BASE_NAME}${date.getFullYear()}`,
        JSON.stringify(getState())
      );
      return returnValue;
    }
  };
};

function getLocalDeployDate(): string | undefined {
  let deployDate: string | undefined;
  for (let i = 0, length = window.localStorage.length; i < length; ++i) {
    const key = window.localStorage.key(i);
    if (key !== null && key.includes(BASE_NAME)) {
      deployDate = key.slice(BASE_NAME.length);
    }
  }
  return deployDate;
}

export const configureAppStore = (initState: IMainState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(saveStateToLocalStore),
    preloadedState: initState,
  });
  if ((module as any).hot) {
    (module as any).hot.accept("../reducers/combineReducer.ts", () =>
      store.replaceReducer(require("../reducers/combineReducer.ts").rootReducer)
    );
  }
  return store;
};

function getPreloadedState(): any {
  return {};
}

export const store = configureAppStore(getPreloadedState());

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
