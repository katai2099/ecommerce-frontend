export interface IGuiReduxState {
  loading: boolean;
}

export class GuiReduxState implements IGuiReduxState {
  constructor(public loading: boolean = false) {}
}
