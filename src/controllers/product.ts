import {
  fetchAdminCategoriesAction,
  fetchAdminSizesAction,
} from "../actions/adminActions";
import { addToCartAction } from "../actions/cartActions";
import {
  addCategoryAction,
  addProductAction,
  addSizeAction,
  deleteReviewAction,
  getProductAction,
  getProductReviewsAction,
  getProductUserReviewAction,
  getProductsAction,
  setCategoryPublishAction,
  setCategoryTopAction,
  setProductFeaturedAction,
  setProductPublishAction,
  submitReviewAction,
  updateCategoryAction,
  updateProductAction,
  updateSizeAction,
} from "../actions/productActions";
import { IAddToCartRequest } from "../model/cart";
import { ICategory } from "../model/category";
import {
  Gender,
  INewCategoryRequest,
  INewProductError,
  INewProductRequest,
  IProduct,
  IProductFilter,
  IProductFilterParams,
  NewProductError,
  ProductMode,
  productSort,
} from "../model/product";
import { INewReview } from "../model/review";
import { ISize } from "../model/size";
import { addToCartState } from "../reducers/cartReducer";
import { setLoading } from "../reducers/guiReducer";
import { setNewProductError } from "../reducers/productReducer";
import { store } from "../store/configureStore";
import { isStringEmpty } from "./utils";

export function addToCart(
  product: IProduct,
  selectedSizeIndex: number
): Promise<number> {
  const addToCartRequest: IAddToCartRequest = {
    productId: product.id,
    size: product.productSizes[selectedSizeIndex].size.name,
  };
  return store
    .dispatch(addToCartAction(addToCartRequest))
    .unwrap()
    .then((res) => {
      store.dispatch(
        addToCartState({
          product: product,
          cartItemId: res,
          sizeIndex: selectedSizeIndex,
        })
      );
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));
}

export function getProducts(filter: IProductFilter) {
  return store
    .dispatch(getProductsAction(filter))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getProduct(productId: string) {
  return store
    .dispatch(getProductAction(productId))
    .unwrap()
    .then((data) => Promise.resolve(data))
    .catch((err) => Promise.reject(err));
}

export function getProductUserReview(productId: string) {
  return store
    .dispatch(getProductUserReviewAction(productId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getProductReviews(productId: number, page: number) {
  return store
    .dispatch(getProductReviewsAction({ productId, page }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function submitReview(productId: number, review: INewReview) {
  return store
    .dispatch(submitReviewAction({ productId, newReview: review }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function deleteReview(reviewId: number) {
  return store
    .dispatch(deleteReviewAction(reviewId.toString()))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function updateProductCont(product: IProduct, files: File[]) {
  const updatedProduct: INewProductRequest = {
    productData: product,
    files: files,
  };
  return store
    .dispatch(updateProductAction(updatedProduct))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function setProductFeatured(featured: boolean, id: number) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(setProductFeaturedAction({ id, featured }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function setProductPublish(publish: boolean, id: number) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(setProductPublishAction({ id, publish }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function addNewProduct(product: IProduct, files: File[]) {
  const uploadProduct: INewProductRequest = {
    productData: product,
    files: files,
  };
  return store
    .dispatch(addProductAction(uploadProduct))
    .unwrap()
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));
}

export function addNewSize(size: ISize) {
  return store
    .dispatch(addSizeAction(size))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function updateSize(size: ISize) {
  return store
    .dispatch(updateSizeAction(size))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function updateCategoryCont(category: ICategory, files: File[]) {
  const updateCategory: INewCategoryRequest = {
    categoryData: category,
    files: files,
  };
  return store
    .dispatch(updateCategoryAction(updateCategory))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function setCategoryTop(isTop: boolean, id: number) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(setCategoryTopAction({ id, isTop }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function setCategoryPublish(publish: boolean, id: number) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(setCategoryPublishAction({ id, publish }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function addNewCategory(category: ICategory, files: File[]) {
  const updateCategory: INewCategoryRequest = {
    categoryData: category,
    files: files,
  };
  return store
    .dispatch(addCategoryAction(updateCategory))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.resolve(err));
}

export function processProductFilter(
  filter: IProductFilter
): IProductFilterParams {
  const filterParams: IProductFilterParams = {};

  if (filter.q) {
    filterParams.q = filter.q;
  }
  if (filter.sort) {
    filterParams.sort = filter.sort;
  }
  if (filter.category && filter.category.length > 0) {
    filterParams.category = processCategory(filter.category);
  }
  if (filter.stock) {
    filterParams.stock = filter.stock;
  }
  if (filter.publish) {
    filterParams.publish = filter.publish;
  }
  if (filter.gender && filter.gender.length > 0) {
    filterParams.gender = processGender(filter.gender);
  }
  if (filter.pmin) {
    filterParams.pmin = filter.pmin;
  }
  if (filter.pmax) {
    filterParams.pmax = filter.pmax;
  }

  if (filter.rating) {
    filterParams.rating = filter.rating;
  }
  if (filter.page) {
    filterParams.page = filter.page;
  }
  return filterParams;
}

function processGender(genders: Gender[]): string {
  const selectedGenders = genders.join("::");
  return selectedGenders;
}

function processCategory(categories: string[]): string {
  const selectedCategories = categories.join("::");
  return selectedCategories;
}

export function validateNewProduct(
  product: IProduct,
  mode: ProductMode,
  files: File[]
): boolean {
  let valid = true;
  const error: INewProductError = new NewProductError();
  if (isStringEmpty(product.name)) {
    valid = false;
    error.name = "Name is required";
  }
  if (isStringEmpty(product.description)) {
    valid = false;
    error.description = "Description is required";
  }
  if (
    (mode === ProductMode.CREATE && files.length === 0) ||
    (mode === ProductMode.EDIT &&
      files.length === 0 &&
      product.images.length === 0)
  ) {
    valid = false;
    error.image = "At least one file is required";
  }
  if (product.price === 0) {
    valid = false;
    error.price = "Price must be greater than 0";
  }
  if (product.productSizes.length === 0) {
    valid = false;
    error.size = "Product must have at least one size";
  }
  for (let i = 0; i < product.productSizes.length; i++) {
    if (product.productSizes[i].stockCount === 0) {
      valid = false;
      error.size = "size cannot contain zero quantity";
      break;
    }
  }
  store.dispatch(setNewProductError(error));
  return valid;
}

export function isFilterEmpty(
  filter: IProductFilter,
  isTop: boolean = false,
  isGender: boolean = true
) {
  if (filter.sort !== undefined && filter.sort !== productSort[0]) {
    return false;
  }
  if (filter.gender.length > 0 && !isGender) {
    return false;
  }
  if (
    filter.category.length > 0 &&
    filter.category[0].toLowerCase() !== "all" &&
    !isTop
  ) {
    return false;
  }
  if (
    filter.pmin !== undefined &&
    filter.pmax !== undefined &&
    (filter.pmin !== 0 || filter.pmax !== 100)
  ) {
    return false;
  }
  if (filter.rating !== undefined && filter.rating !== 0) {
    return false;
  }
  return true;
}

export function fetchAdminSettings() {
  return Promise.all([
    store.dispatch(fetchAdminCategoriesAction()),
    store.dispatch(fetchAdminSizesAction()),
  ])
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));
}
