import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    bigNav: true;
    smartphone: true;
  }
}

export const shades = {
  primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#d6001c",
    600: "#ab0016",
    700: "#800011",
    800: "#56000b",
    900: "#2b0006",
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#a6a4a4",
    700: "#7c7b7b",
    800: "#535252",
    900: "#292929",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Lato", "sans-serif"].join(","),
      fontSize: 48,
    },
    h2: {
      fontFamily: ["Lato", "sans-serif"].join(","),
      fontSize: 36,
    },
    h3: {
      fontFamily: ["Lato", "sans-serif"].join(","),
      fontSize: 20,
    },
    h4: {
      fontFamily: ["Lato", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      bigNav: 760,
      smartphone: 424,
    },
  },
});
