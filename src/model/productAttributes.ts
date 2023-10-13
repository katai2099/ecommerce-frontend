import { IIdName } from "./common";

export interface IProductAttributesReduxState {
  categories: IIdName[];
  sizes: IIdName[];
  categoriesLoading: boolean;
  categoriesError: boolean;
  sizesLoading: boolean;
  sizesError: boolean;
}

export class ProductAttributesReduxState
  implements IProductAttributesReduxState
{
  constructor(
    public categories: IIdName[] = [],
    public sizes: IIdName[] = [],
    public categoriesLoading = false,
    public categoriesError = false,
    public sizesLoading = false,
    public sizesError = false
  ) {}
}
