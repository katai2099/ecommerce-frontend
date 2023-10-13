import { AlertColor } from "@mui/material";

export interface IGuiReduxState {
  loading: boolean;
  showSnackbar: boolean;
  snackbarText: string;
  snackbarVerticalPos: "top" | "bottom";
  snackbarHorizontalPos: "left" | "right";
  snackbarExtraMargin: boolean;
  snackbarSevirity: AlertColor;
}

export class GuiReduxState implements IGuiReduxState {
  constructor(
    public loading: boolean = false,
    public showSnackbar = false,
    public snackbarText = "",
    public snackbarVerticalPos: "top" | "bottom" = "top",
    public snackbarHorizontalPos: "left" | "right" = "right",
    public snackbarSevirity: AlertColor = "error",
    public snackbarExtraMargin = false
  ) {}
}

export interface ISnackbarProps {
  showSnackbar: boolean;
  snackbarText: string;
  snackbarSevirity?: AlertColor;
  snackbarVerticalPos?: "top" | "bottom";
  snackbarHorizontalPos?: "left" | "right";
}
