import { addToCartAction } from "../actions/cartActions";
import {
  addProductAction,
  deleteReviewAction,
  getProductAction,
  getProductReviewsAction,
  getProductUserReviewAction,
  getProductsAction,
  submitReviewAction,
} from "../actions/productActions";
import { IAddToCartRequest } from "../model/cart";
import {
  Gender,
  INewProductRequest,
  IProduct,
  IProductFilter,
  IProductFilterParams,
  ProductMode,
  productSort,
} from "../model/product";
import { INewReview } from "../model/review";
import { addToCartState } from "../reducers/cartReducer";
import {
  setEditedProduct,
  setProductMode,
  setProductSubmitData,
  setSelectedProduct,
} from "../reducers/productReducer";
import { store } from "../store/configureStore";

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

export function addNewProduct(product: IProduct, files: File[]) {
  store.dispatch(setProductSubmitData(true));
  const uploadProduct: INewProductRequest = {
    productData: product,
    files: files,
  };
  store
    .dispatch(addProductAction(uploadProduct))
    .unwrap()
    .then((data) => {
      store.dispatch(setSelectedProduct(data));
      store.dispatch(setEditedProduct(data));
      store.dispatch(setProductMode(ProductMode.VIEW));
    })
    .finally(() => {
      store.dispatch(setProductSubmitData(false));
    });
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
