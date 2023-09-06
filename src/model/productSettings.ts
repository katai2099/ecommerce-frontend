import { IIdName } from "./common";
import { Filter, IProductFilter } from "./product";

export interface IProductSettingsReduxState {
  categories: IIdName[];
  sizes: IIdName[];
  filter: IProductFilter;
}

export class ProductSettingsReduxState {
  constructor(
    public categories: IIdName[] = [],
    public sizes: IIdName[] = [],
    public filter = new Filter()
  ) {}
}
