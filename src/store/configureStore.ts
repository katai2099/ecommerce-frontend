import { Middleware, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { IMainState } from "../model/common";
import { rootReducer } from "../reducers/combineReducer";

export const BASE_NAME = "storedState_";

const saveStateToLocalStore: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    let deployKey = "";
    const deployKeyFromLocalStorage = getLocalDeployKey();
    if (deployKeyFromLocalStorage) {
      deployKey = deployKeyFromLocalStorage;
      window.localStorage.setItem(`${deployKey}`, JSON.stringify(getState()));
      return returnValue;
    } else {
      window.localStorage.setItem(`${BASE_NAME}`, JSON.stringify(getState()));
      return returnValue;
    }
  };
};

function getLocalDeployKey(): string | undefined {
  let store_key: string | undefined;
  for (let i = 0, length = window.localStorage.length; i < length; ++i) {
    const key = window.localStorage.key(i);
    if (key !== null && key.includes(BASE_NAME)) {
      store_key = key;
    }
  }
  return store_key;
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
