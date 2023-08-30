import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Admin } from "./admin/pages/Admin";
import { ThemeProvider } from "@emotion/react";
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

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
