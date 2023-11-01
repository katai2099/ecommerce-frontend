import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../controllers/clientRequest";
import { ICategory } from "../model/category";
import { ISize } from "../model/size";
import { setAdminCategories, setAdminSizes } from "../reducers/adminReducer";

export const fetchAdminCategoriesAction = createAsyncThunk<ICategory[]>(
  "admin_fetch_category",
  (_, thunkApi) => {
    return getAdminCategoriesWorker(true)
      .then((res) => {
        thunkApi.dispatch(setAdminCategories(res));
        return Promise.resolve(res);
      })
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

export function getAdminCategoriesWorker(
  isAdmin: boolean = false
): Promise<ICategory[]> {
  return getRequest<ICategory[]>(
    `/products/category${isAdmin ? "?isAdmin=true" : ""}`
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const fetchAdminSizesAction = createAsyncThunk<ISize[]>(
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

export function getAdminSizesWorker(): Promise<ISize[]> {
  return getRequest<ISize[]>("/products/size?admin=true", { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
