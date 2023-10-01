import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { loginAction, registerAction } from "../actions/userActions";
import { IAuthenticationResponse } from "../model/authentication";
import {
  IUserDetailsRequest,
  IUserReduxState,
  UserReduxtState,
} from "../model/user";

const initialState: IUserReduxState = new UserReduxtState();

export const userSlice = createSlice({
  name: "user",
  reducers: {
    updateUserDetails: (state, payload: PayloadAction<IUserDetailsRequest>) => {
      return { ...state, ...payload.payload };
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        const userInfo: IAuthenticationResponse = action.payload;
        return {
          ...state,
          ...userInfo,
        };
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        const userInfo: IAuthenticationResponse = action.payload;
        return { ...state, ...userInfo };
      });
  },
});

export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
