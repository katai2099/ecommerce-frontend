import { IAdminReduxState, adminReduxState } from "./admin";
import { CartReduxState, ICartReduxState } from "./cart";
import { CheckoutReduxState, ICheckoutReduxState } from "./checkout";
import { GuiReduxState, IGuiReduxState } from "./gui";
import { HomepageReduxState, IHomepageReduxState } from "./homepage";
import { IProductReduxState, ProductReduxState } from "./product";
import {
  IProductSettingsReduxState,
  ProductSettingsReduxState,
} from "./productSettings";
import { IUserReduxState, UserReduxtState } from "./user";

export class MainState implements IMainState {
  constructor(
    public product: IProductReduxState = new ProductReduxState(),
    public user: IUserReduxState = new UserReduxtState(),
    public admin: IAdminReduxState = new adminReduxState(),
    public gui: IGuiReduxState = new GuiReduxState(),
    public productSettings: IProductSettingsReduxState = new ProductSettingsReduxState(),
    public cart: ICartReduxState = new CartReduxState(),
    public checkout: ICheckoutReduxState = new CheckoutReduxState(),
    public homepage: IHomepageReduxState = new HomepageReduxState()
  ) {}
}

export interface IMainState {
  product: IProductReduxState;
  user: IUserReduxState;
  admin: IAdminReduxState;
  gui: IGuiReduxState;
  productSettings: IProductSettingsReduxState;
  cart: ICartReduxState;
  checkout: ICheckoutReduxState;
  homepage: IHomepageReduxState;
}

export interface IIdName {
  id: number;
  name: string;
}

export interface StringKeyValue {
  [key: string]: string;
}

export interface IPaginationResponse<T> {
  currentPage: number;
  totalItem: number;
  totalPage: number;
  data: T[];
}

export interface IPaginationFilterData {
  currentPageTotalItem: number;
  totalItem: number;
  totalPage: number;
  page: number;
}

export class PaginationFilterData implements IPaginationFilterData {
  constructor(
    public currentPageTotalItem = 0,
    public totalItem = 0,
    public totalPage = 0,
    public page = 1
  ) {}
}

export interface IErrorResponse {
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

export class ErrorResponse implements IErrorResponse {
  constructor(
    public message = "",
    public path = "",
    public status = 0,
    public timestamp = ""
  ) {}
}
