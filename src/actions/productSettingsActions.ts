import { createAsyncThunk } from "@reduxjs/toolkit";
import { IIdName } from "../model/common";
import { setCategories } from "../reducers/productAttributesReducer";
import { getAdminCategoriesWorker } from "./adminActions";

export const fetchProductAttributesCategoriesAction = createAsyncThunk<
  IIdName[]
>("productSettings/category", (_, thunkApi) => {
  return getAdminCategoriesWorker()
    .then((res) => {
      thunkApi.dispatch(setCategories(res));
      return Promise.resolve(res);
    })
    .catch((err) => thunkApi.rejectWithValue(err));
});
