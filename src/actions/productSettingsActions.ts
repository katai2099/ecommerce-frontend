import { createAsyncThunk } from "@reduxjs/toolkit";
import { IIdName } from "../model/common";
import { setCategories } from "../reducers/productSettingsReducer";
import { getAdminCategoriesWorker } from "./adminActions";

export const fetchProductSetttingsCategoriesAction = createAsyncThunk<
  IIdName[]
>("productSettings/category", (_, thunkApi) => {
  return getAdminCategoriesWorker()
    .then((res) => {
      thunkApi.dispatch(setCategories(res));
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));
});
