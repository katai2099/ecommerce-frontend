import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../controllers/clientRequest";
import { ICategory } from "../model/category";
import { IIdName } from "../model/common";
import { setAdminCategories, setAdminSizes } from "../reducers/adminReducer";

export const fetchAdminCategoriesAction = createAsyncThunk<ICategory[]>(
  "admin_fetch_category",
  (_, thunkApi) => {
    return getAdminCategoriesWorker()
      .then((res) => {
        thunkApi.dispatch(setAdminCategories(res));
        return Promise.resolve(res);
      })
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

export function getAdminCategoriesWorker(): Promise<ICategory[]> {
  return getRequest<ICategory[]>("/products/category/")
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const fetchAdminSizesAction = createAsyncThunk<IIdName[]>(
  "admin_fetch_size",
  (_, thunkApi) => {
    return getAdminSizesWorker()
      .then((res) => {
        thunkApi.dispatch(setAdminSizes(res));
        return Promise.resolve(res);
      })
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

export function getAdminSizesWorker(): Promise<IIdName[]> {
  return getRequest<IIdName[]>("/products/size/", { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
