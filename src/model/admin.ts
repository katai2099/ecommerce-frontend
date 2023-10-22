import { Category, ICategory } from "./category";
import { IIdName } from "./common";

export enum AdminMode {
  CREATE,
  EDIT,
  VIEW,
}

export interface IAdminReduxState {
  categories: ICategory[];
  sizes: IIdName[];
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
