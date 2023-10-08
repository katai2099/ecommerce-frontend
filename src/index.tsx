import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CheckoutReduxState } from "./model/checkout";
import { IMainState } from "./model/common";
import { GuiReduxState } from "./model/gui";
import { Filter } from "./model/product";
import { setInitialState } from "./reducers/combineReducer";
import { BASE_NAME, store } from "./store/configureStore";
import { theme } from "./styles/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

window.onload = () => {
  const storedState = window.localStorage.getItem(BASE_NAME);
  if (storedState) {
    const initialState: IMainState = JSON.parse(storedState);
    const updatedInitialState: IMainState = {
      ...initialState,
      gui: new GuiReduxState(),
      productSettings: {
        ...initialState.productSettings,
        filter: new Filter(),
      },
      checkout: new CheckoutReduxState(),
    };
    store.dispatch(setInitialState({ state: updatedInitialState }));
  } else {
    window.localStorage.removeItem("jwt");
  }
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
};
