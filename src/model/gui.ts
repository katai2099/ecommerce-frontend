export interface IGuiReduxState {
  loading: boolean;
  showSnackbar: boolean;
  snackbarText: string;
  snackbarVerticalPos: "top" | "bottom";
  snackbarHorizontalPos: "left" | "right";
}

export class GuiReduxState implements IGuiReduxState {
  constructor(
    public loading: boolean = false,
    public showSnackbar = false,
    public snackbarText = "",
    public snackbarVerticalPos: "top" | "bottom" = "top",
    public snackbarHorizontalPos: "left" | "right" = "right"
  ) {}
}

export interface ISnackbarProps {
  showSnackbar: boolean;
  snackbarText: string;
  snackbarVerticalPos?: "top" | "bottom";
  snackbarHorizontalPos?: "left" | "right";
}
