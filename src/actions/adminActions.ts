import { createAsyncThunk } from "@reduxjs/toolkit";
import { IIdName } from "../model/common";
import { setAdminCategories, setAdminSizes } from "../reducers/adminReducer";
import { getRequest } from "../controllers/clientRequest";

export const fetchAdminSettingsAction = createAsyncThunk(
  "admin/settings",
  (_, thunkApi) => {
    return Promise.all([
      thunkApi.dispatch(fetchAdminCategoriesAction()),
      thunkApi.dispatch(fetchAdminSizesAction()),
    ])
      .then(() => Promise.resolve())
      .catch((err) => Promise.reject(err));
  }
);

const fetchAdminCategoriesAction = createAsyncThunk<IIdName[]>(
  "admin/category",
  (_, thunkApi) => {
    return getAdminCategoriesWorker()
      .then((res) => {
        thunkApi.dispatch(setAdminCategories(res));
        return Promise.resolve(res);
      })
      .catch((err) => Promise.reject(err));
  }
);

export function getAdminCategoriesWorker(): Promise<IIdName[]> {
  return getRequest<IIdName[]>("/products/category/", { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

const fetchAdminSizesAction = createAsyncThunk<IIdName[]>(
  "admin/size",
  (_, thunkApi) => {
    return getAdminSizesWorker()
      .then((res) => {
        thunkApi.dispatch(setAdminSizes(res));
        return Promise.resolve(res);
      })
      .catch((err) => Promise.reject(err));
  }
);

export function getAdminSizesWorker(): Promise<IIdName[]> {
  return getRequest<IIdName[]>("/products/size/", { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
