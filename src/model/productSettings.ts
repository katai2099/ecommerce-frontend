import { IIdName } from "./common";
import { IProductFilter, ProductFilter } from "./product";

export interface IProductSettingsReduxState {
  categories: IIdName[];
  sizes: IIdName[];
  productFilter: IProductFilter;
}

export class ProductSettingsReduxState {
  constructor(
    public categories: IIdName[] = [],
    public sizes: IIdName[] = [],
    public productFilter = new ProductFilter()
  ) {}
}
