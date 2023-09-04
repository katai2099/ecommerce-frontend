import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAuthenticationResponse,
  LoginPostData,
  SignUpPostData,
} from "../model/authentication";
import { postRequest } from "../controllers/clientRequest";

export const loginAsync = createAsyncThunk<
  IAuthenticationResponse,
  LoginPostData
>("auth/login", (data, thunkApi) => {
  return login(data)
    .then((res) => {
      window.localStorage.setItem("jwt", res.token);
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
});

export const logout = createAction("auth/logout");

export const registerAsync = createAsyncThunk<
  IAuthenticationResponse,
  SignUpPostData
>("auth/register", (data, thunkApi) => {
  return register(data)
    .then((res) => {
      window.localStorage.setItem("jwt", res.token);
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
});

export function login(
  loginData: LoginPostData
): Promise<IAuthenticationResponse> {
  return postRequest<IAuthenticationResponse>("/auth/login", loginData)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function register(
  signUpData: SignUpPostData
): Promise<IAuthenticationResponse> {
  return postRequest<IAuthenticationResponse>("/auth/register", signUpData)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
