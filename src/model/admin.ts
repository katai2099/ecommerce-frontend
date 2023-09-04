import { IIdName } from "./common";

export interface IAdminReduxState {
  categories: IIdName[];
  sizes: IIdName[];
}

export class adminReduxState implements IAdminReduxState {
  constructor(public categories = [], public sizes = []) {}
}
