import { AccountReduxState, IAccountReduxState } from "./account";
import {
  CategoryReduxState,
  IAdminReduxState,
  ICategoryReduxState,
  adminReduxState,
} from "./admin";
import { CartReduxState, ICartReduxState } from "./cart";
import { CheckoutReduxState, ICheckoutReduxState } from "./checkout";
import { GuiReduxState, IGuiReduxState } from "./gui";
import { HomepageReduxState, IHomepageReduxState } from "./homepage";
import {
  IProductDetailReduxState,
  IProductReduxState,
  IProductReviewReduxState,
  ProductDetailReduxState,
  ProductReduxState,
  ProductReviewReduxState,
} from "./product";
import {
  IProductAttributesReduxState,
  ProductAttributesReduxState,
} from "./productAttributes";
import { IProductListReduxState, ProductListReduxState } from "./productList";
import { IUserReduxState, UserReduxtState } from "./user";

export class MainState implements IMainState {
  constructor(
    public product: IProductReduxState = new ProductReduxState(),
    public user: IUserReduxState = new UserReduxtState(),
    public admin: IAdminReduxState = new adminReduxState(),
    public gui: IGuiReduxState = new GuiReduxState(),
    public productAttributes: IProductAttributesReduxState = new ProductAttributesReduxState(),
    public cart: ICartReduxState = new CartReduxState(),
    public checkout: ICheckoutReduxState = new CheckoutReduxState(),
    public homepage: IHomepageReduxState = new HomepageReduxState(),
    public productList: IProductListReduxState = new ProductListReduxState(),
    public productDetail: IProductDetailReduxState = new ProductDetailReduxState(),
    public productReview: IProductReviewReduxState = new ProductReviewReduxState(),
    public account: IAccountReduxState = new AccountReduxState(),
    public category: ICategoryReduxState = new CategoryReduxState()
  ) {}
}

export interface IMainState {
  product: IProductReduxState;
  user: IUserReduxState;
  admin: IAdminReduxState;
  gui: IGuiReduxState;
  productAttributes: IProductAttributesReduxState;
  cart: ICartReduxState;
  checkout: ICheckoutReduxState;
  homepage: IHomepageReduxState;
  productList: IProductListReduxState;
  productDetail: IProductDetailReduxState;
  productReview: IProductReviewReduxState;
  account: IAccountReduxState;
  category: ICategoryReduxState;
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
