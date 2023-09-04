import { IIdName, IPaginationResponse } from "./common";

export class Product implements IProduct {
  constructor(
    public id: number = 0,
    public name: string = "",
    public description: string = "",
    public price: number = 0,
    public publish: boolean = true,
    public createdAt: string = "",
    public gender: Gender = Gender.MEN,
    public category: ICategory = new Category(),
    public productSizes: IProductSize[] = [],
    public images: IImage[] = []
  ) {}
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  publish: boolean;
  createdAt: string;
  gender: Gender;
  category: ICategory;
  productSizes: IProductSize[];
  images: IImage[];
}

export interface IProductFilter {
  gender?: Gender;
}

export enum Gender {
  MEN = "MEN",
  WOMEN = "WOMEN",
}

class Category implements ICategory {
  constructor(public id = 1, public name = "") {}
}

interface ICategory {
  id: number;
  name: string;
}

export interface IProductSize {
  id: number;
  stockCount: number;
  size: IIdName;
}

export interface IImage {
  id: number;
  imageUrl: string;
}

export interface INewProductRequest {
  productData: IProduct;
  files: File[];
}

export interface IProductReduxState {
  selectedProduct: Product;
  editedProduct: Product;
  mode: ProductMode;
  submitData: boolean;
}

export enum ProductMode {
  CREATE,
  EDIT,
  VIEW,
}

export class ProductReduxState implements IProductReduxState {
  constructor(
    public selectedProduct: Product = new Product(),
    public editedProduct: Product = new Product(),
    public mode: ProductMode = ProductMode.CREATE,
    public submitData: boolean = false
  ) {}
}
