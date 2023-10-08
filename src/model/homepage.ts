import { ICategory } from "./category";
import { IProduct } from "./product";

export interface IHomepageReduxState {
  featuredProducts: IProduct[];
  featuredProductsLoading: boolean;
  featuredProductsError: boolean;
  topCategories: ICategory[];
  topCategoriesLoading: boolean;
  topCategoriesError: boolean;
}

export class HomepageReduxState {
  constructor(
    public featuredProducts = [],
    public topCategories = [],
    public featuredProductsLoading = false,
    public featuredProductsError = false,
    public topCategoriesLoading = false,
    public topCategoriesError = false
  ) {}
}
