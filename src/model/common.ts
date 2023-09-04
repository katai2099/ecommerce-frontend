import { IAdminReduxState, adminReduxState } from "./admin";
import { IProductReduxState, ProductReduxState } from "./product";
import { IUserReduxState, UserReduxtState } from "./user";

export class MainState implements IMainState {
  constructor(
    public product: IProductReduxState = new ProductReduxState(),
    public user: IUserReduxState = new UserReduxtState(),
    public admin: IAdminReduxState = new adminReduxState()
  ) {}
}

export interface IMainState {
  product: IProductReduxState;
  user: IUserReduxState;
  admin: IAdminReduxState;
}

export interface IIdName {
  id: number;
  name: string;
}

export interface IPaginationResponse<T> {
  currentPage: number;
  totalItem: number;
  totalPage: number;
  data: T[];
}
