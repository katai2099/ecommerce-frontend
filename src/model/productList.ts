import { Filter, IProductFilter } from "./product";

export interface IProductListReduxState {
  filter: IProductFilter;
  mobileFilterDrawerOpen: boolean;
  isSearch: boolean;
  isTopCategory: boolean;
}

export class ProductListReduxState {
  constructor(
    public filter = new Filter(),
    public mobileFilterDrawerOpen = false,
    public isSearch = false,
    public isTopCategory = false
  ) {}
}
