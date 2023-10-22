import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../controllers/clientRequest";
import { processProductFilter } from "../controllers/product";
import { ICategory } from "../model/category";
import { IPaginationResponse } from "../model/common";
import {
  INewCategoryRequest,
  INewProductRequest,
  IProduct,
  IProductFilter,
} from "../model/product";
import { INewReview, IReview } from "../model/review";
import { ISize } from "../model/size";
import { setLoading } from "../reducers/guiReducer";

export const getTopCategoriesAction = createAsyncThunk<ICategory[]>(
  "get_top_categories",
  () => {
    return getTopCategoriesWorker()
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
);

function getTopCategoriesWorker(): Promise<ICategory[]> {
  return getRequest<ICategory[]>("/products/top-categories")
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getFeaturedProductsAction = createAsyncThunk<IProduct[]>(
  "get_featured_products",
  () => {
    return getFeaturedProductsWorker()
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
);

function getFeaturedProductsWorker(): Promise<IProduct[]> {
  return getRequest<IProduct[]>("/products/featured-products")
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getProductsAction = createAsyncThunk<
  IPaginationResponse<IProduct>,
  IProductFilter
>(
  "get_products",
  (
    filter = {
      category: [],
      gender: [],
    },
    thunkApi
  ) => {
    return fetchProductsWorker(filter)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function fetchProductsWorker(filter: IProductFilter) {
  const filterParams = processProductFilter(filter);
  return getRequest<IPaginationResponse<IProduct>>("/products", {
    requestParams: filterParams,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const productsLoad = (
  filters: IProductFilter = {
    category: [],
    gender: [],
  }
) => getProductsAction(filters);

export const getProductAction = createAsyncThunk<IProduct, string>(
  "get_product",
  (productId, thunkApi) => {
    return getProductWorker(productId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function getProductWorker(productId: string) {
  return getRequest<IProduct>(`/products/${productId}`)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const setCategoryTopAction = createAsyncThunk<
  string,
  { id: number; isTop: boolean }
>("set_category_top", (data, thunkApi) => {
  return setCategoryTopWorker(data)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function setCategoryTopWorker(data: { id: number; isTop: boolean }) {
  return putRequest<string>(
    `/products/category/${data.id}/top-category`,
    { isTop: data.isTop },
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const setCategoryPublishAction = createAsyncThunk<
  string,
  { id: number; publish: boolean }
>("set_category_publish", (data, thunkApi) => {
  return setCategoryPublishWorker(data)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function setCategoryPublishWorker(data: { id: number; publish: boolean }) {
  return putRequest<string>(
    `/products/category/${data.id}/publish`,
    { publish: data.publish },
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateCategoryAction = createAsyncThunk<
  ICategory,
  INewCategoryRequest
>("update_category", (category, thunkApi) => {
  return updateCategoryWorker(category)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function updateCategoryWorker(category: INewCategoryRequest) {
  return putRequest<ICategory>(
    `/products/category/${category.categoryData.id}`,
    category,
    {
      auth: true,
      formData: true,
    }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addCategoryAction = createAsyncThunk<
  ICategory,
  INewCategoryRequest
>("add_category", (category, thunkApi) => {
  return addCategoryWorker(category)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function addCategoryWorker(category: INewCategoryRequest) {
  return postRequest<ICategory>("/products/category", category, {
    auth: true,
    formData: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addProductAction = createAsyncThunk<IProduct, INewProductRequest>(
  "add_product",
  (product, thunkApi) => {
    return addProductWorker(product)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function addProductWorker(product: INewProductRequest) {
  return postRequest<IProduct>("/products/", product, {
    auth: true,
    formData: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addSizeAction = createAsyncThunk<ISize, ISize>(
  "add_size",
  (size, thunkApi) => {
    return addSizeWorker(size)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function addSizeWorker(size: ISize) {
  return postRequest<ISize>("/products/size", size, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateSizeAction = createAsyncThunk<ISize, ISize>(
  "update_size",
  (size, thunkApi) => {
    return updateSizeWorker(size)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function updateSizeWorker(size: ISize) {
  return putRequest<ISize>(`/products/size/${size.id}`, size, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateProductAction = createAsyncThunk<
  IProduct,
  INewProductRequest
>("update_product", (product, thunkApi) => {
  return updateProductWorker(product)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function updateProductWorker(product: INewProductRequest) {
  return putRequest<IProduct>(`/products/${product.productData.id}`, product, {
    auth: true,
    formData: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const setProductPublishAction = createAsyncThunk<
  string,
  { id: number; publish: boolean }
>("set_product_publish", (data, thunkApi) => {
  return setProductPublishWorker(data)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function setProductPublishWorker(data: { id: number; publish: boolean }) {
  return putRequest<string>(
    `/products/${data.id}/publish`,
    { publish: data.publish },
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const setProductFeaturedAction = createAsyncThunk<
  string,
  { id: number; featured: boolean }
>("set_product_featured", (data, thunkApi) => {
  return setProductFeaturedWorker(data)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function setProductFeaturedWorker(data: { id: number; featured: boolean }) {
  return putRequest<string>(
    `/products/${data.id}/featured`,
    { featured: data.featured },
    { auth: true }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const deleteReviewAction = createAsyncThunk<string, string>(
  "delete_review",
  (reviewId, thunkApi) => {
    return deleteReviewWorker(reviewId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function deleteReviewWorker(reviewId: string) {
  return deleteRequest<string>(`/products/user-review/${reviewId}`, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getProductUserReviewAction = createAsyncThunk<IReview, string>(
  "get_product_user_review",
  (productId, thunkApi) => {
    return getProductUserReviewWorker(productId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function getProductUserReviewWorker(productId: string) {
  return getRequest<IReview>(`/products/${productId}/user-review`, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getProductReviewsAction = createAsyncThunk<
  IPaginationResponse<IReview>,
  { productId: number; page: number }
>("get_product_review", (data, thunkApi) => {
  return getProductReviewsWorker(data.productId, data.page)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function getProductReviewsWorker(productId: number, page: number = 1) {
  return getRequest<IPaginationResponse<IReview>>(
    `/products/${productId}/reviews?page=${page}`,
    {
      auth: localStorage.getItem("jwt") !== null ? true : false,
    }
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const submitReviewAction = createAsyncThunk<
  string,
  { productId: number; newReview: INewReview }
>("put_new_review", (data, thunkApi) => {
  thunkApi.dispatch(setLoading(true));
  return submitReviewWorker(data.productId, data.newReview)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err))
    .finally(() => {
      thunkApi.dispatch(setLoading(false));
    });
});

function submitReviewWorker(productId: number, newReview: INewReview) {
  return putRequest<string>(`/products/${productId}/reviews`, newReview, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
