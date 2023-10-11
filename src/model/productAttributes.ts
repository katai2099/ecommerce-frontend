import { IIdName } from "./common";

export interface IProductAttributesReduxState {
  categories: IIdName[];
  sizes: IIdName[];
}

export class ProductAttributesReduxState {
  constructor(
    public categories: IIdName[] = [],
    public sizes: IIdName[] = []
  ) {}
}
