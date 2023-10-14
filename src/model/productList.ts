import { Filter, IProduct, IProductFilter } from "./product";

export interface IProductListReduxState {
  filter: IProductFilter;
  mobileFilterDrawerOpen: boolean;
  isSearch: boolean;
  isTopCategory: boolean;
  isLoading: boolean;
  isError: boolean;
  products: IProduct[];
  totalItems: number;
}

export class ProductListReduxState {
  constructor(
    public filter = new Filter(),
    public mobileFilterDrawerOpen = false,
    public isSearch = false,
    public isTopCategory = false,
    public isLoading = false,
    public isError = false,
    public products = [],
    public totalItems = 0
  ) {}
}
