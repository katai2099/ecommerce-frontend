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
    setLogin: (state, payload: PayloadAction<boolean>) => {
      return { ...state, loggedIn: payload.payload };
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
          loggedIn: true,
        };
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        const userInfo: IAuthenticationResponse = action.payload;
        return { ...state, ...userInfo, loggedIn: true };
      });
  },
});

export const { updateUserDetails, setLogin } = userSlice.actions;
export default userSlice.reducer;
