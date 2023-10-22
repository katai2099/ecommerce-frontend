import { Category, ICategory } from "./category";
import { ISize } from "./size";

export enum AdminMode {
  CREATE,
  EDIT,
  VIEW,
}

export interface IAdminReduxState {
  categories: ICategory[];
  sizes: ISize[];
}

export class adminReduxState implements IAdminReduxState {
  constructor(public categories = [], public sizes = []) {}
}

export interface ICategoryReduxState {
  selectedCategory: ICategory;
  editedCategory: ICategory;
  mode: AdminMode;
  loading: boolean;
}

export class CategoryReduxState implements ICategoryReduxState {
  constructor(
    public selectedCategory = new Category(),
    public editedCategory = new Category(),
    public mode = AdminMode.CREATE,
    public loading = false
  ) {}
}
