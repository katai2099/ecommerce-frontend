import { HeadCell } from "../admin/style/common";
import { AdminMode } from "./admin";
import { IIdName } from "./common";
import { IReview, Review } from "./review";

export enum Gender {
  MEN = "MEN",
  WOMEN = "WOMEN",
}

export interface ProductProps {
  product: IProduct;
}

export class Product implements IProduct {
  constructor(
    public id: number = 0,
    public name: string = "",
    public description: string = "",
    public price: number = 0,
    public publish: boolean = true,
    public createdAt: string = "",
    public gender: Gender = Gender.MEN,
    public rating: number = 0,
    public totalReview: number = 0,
    public category: ICategory = new Category(),
    public productSizes: IProductSize[] = [],
    public images: IImage[] = [],
    public featured: boolean = false
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
  rating: number;
  totalReview: number;
  category: ICategory;
  productSizes: IProductSize[];
  images: IImage[];
  featured: boolean;
}

export const productSortName: string[] = [
  "Default",
  "Newest Arrivals",
  "Price: High to Low",
  "Price: Low to High",
];

export const productSort: string[] = [
  "default",
  "newest",
  "highestprice",
  "lowestprice",
];

export interface IProductFilter {
  q?: string;
  sort?: string;
  category: string[];
  stock?: string;
  publish?: string;
  gender: Gender[];
  pmin?: number;
  pmax?: number;
  rating?: number;
  page?: number;
  itemperpage?: number;
}

export interface IProductFilterParams {
  q?: string;
  sort?: string;
  category?: string;
  stock?: string;
  publish?: string;
  gender?: string;
  pmin?: number;
  pmax?: number;
  rating?: number;
  page?: number;
  itemperpage?: number;
}

export class Filter implements IProductFilter {
  constructor(
    public page: number = 1,
    public sort: string = productSort[0],
    public category: string[] = [],
    public gender: Gender[] = [],
    public rating: number = 0,
    public itemperpage: number = 20
  ) {}
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

export interface INewCategoryRequest {
  categoryData: ICategory;
  files: File[];
}

export interface IProductReduxState {
  selectedProduct: Product;
  editedProduct: Product;
  newProductError: INewProductError;
  mode: AdminMode;
  submitData: boolean;
}

export class ProductReduxState implements IProductReduxState {
  constructor(
    public selectedProduct: Product = new Product(),
    public editedProduct: Product = new Product(),
    public newProductError: INewProductError = new NewProductError(),
    public mode: AdminMode = AdminMode.CREATE,
    public submitData: boolean = false
  ) {}
}

export interface IProductDetailReduxState {
  product: IProduct;
  isLoading: boolean;
  isError: boolean;
}

export class ProductDetailReduxState implements IProductDetailReduxState {
  constructor(
    public product = new Product(),
    public isLoading = true,
    public isError = false
  ) {}
}

export interface IProductReviewReduxState {
  productReviews: IReview[];
  isReviewsLoading: boolean;
  isReviewsError: boolean;
  ownerReview: IReview;
  isNoOwnerReview: boolean;
}

export class ProductReviewReduxState implements IProductReviewReduxState {
  constructor(
    public productReviews = [],
    public isReviewsLoading = true,
    public isReviewsError = false,
    public ownerReview = new Review(),
    public isNoOwnerReview = true
  ) {}
}

export interface INewProductError {
  name: string;
  description: string;
  image: string;
  price: string;
  size: string;
}

export class NewProductError implements INewProductError {
  constructor(
    public name = "",
    public description = "",
    public image = "",
    public price = "",
    public size = ""
  ) {}
}

export const productTableHeadCells: readonly HeadCell[] = [
  {
    label: "Product",
  },
  {
    label: "Create at",
  },
  {
    label: "Stock",
  },
  {
    label: "Featured",
  },
  {
    label: "Price",
  },
  {
    label: "Publish",
  },
];

export const categoryTableHeadCells: readonly HeadCell[] = [
  {
    label: "Category",
  },
  { label: "Top category" },
  {
    label: "Publish",
  },
  { label: "Last modified" },
];

export const sizeTableHeadCells: readonly HeadCell[] = [
  {
    label: "Size",
  },
  {
    label: "Publish",
  },
  { label: "Last modified" },
];
