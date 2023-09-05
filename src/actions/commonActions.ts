import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../reducers/guiReducer";

export const loadingWrapper = <T>(promiseToCall: Promise<T>) => {
  return createAsyncThunk("name", (_, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(setLoading(true));
    return Promise.resolve(promiseToCall)
      .then((res) => {
        dispatch(setLoading(false));
        return Promise.resolve(res);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        return Promise.reject(err);
      });
  });
};
