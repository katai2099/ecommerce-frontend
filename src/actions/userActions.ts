import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../controllers/clientRequest";
import {
  IAuthenticationResponse,
  LoginPostData,
  SignUpPostData,
} from "../model/authentication";
import {
  IAddress,
  IUpdatePasswordRequest,
  IUserDetailsRequest,
} from "../model/user";
import { setLoading } from "../reducers/guiReducer";
import { updateUserDetails } from "../reducers/userReducer";

export const updatePasswordAction = createAsyncThunk<string, string>(
  "update_password",
  (password, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    //TODO: encode should go to controller
    const encodedUpdatePasswordRequest: IUpdatePasswordRequest = {
      password: btoa(password),
    };
    return updatePasswordWorker(encodedUpdatePasswordRequest)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function updatePasswordWorker(password: IUpdatePasswordRequest) {
  return postRequest<string>("/users/update-password", password, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateUserDetailsAction = createAsyncThunk<
  string,
  IUserDetailsRequest
>("update_user_details", (user, thunkApi) => {
  thunkApi.dispatch(setLoading(true));
  return updateUserDetailsWorker(user)
    .then((res) => {
      thunkApi.dispatch(updateUserDetails(user));
      return Promise.resolve(res);
    })
    .catch((err) => thunkApi.rejectWithValue(err))
    .finally(() => {
      thunkApi.dispatch(setLoading(false));
    });
});

function updateUserDetailsWorker(userDetails: IUserDetailsRequest) {
  return putRequest<string>("/users/details", userDetails, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const getAddressesAction = createAsyncThunk<IAddress[]>(
  "get_address",
  (_, thunkApi) => {
    return getAddressesWorker()
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function getAddressesWorker(): Promise<IAddress[]> {
  return getRequest<IAddress[]>("/users/address", { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const addAddressAction = createAsyncThunk<number, IAddress>(
  "add_address",
  (address, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return addAddressWorker(address)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function addAddressWorker(address: IAddress): Promise<number> {
  return postRequest<number>("/users/address", address, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const setDefaultAddressAction = createAsyncThunk<string, number>(
  "set_default_address",
  (addressId, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return setDefaultAddressWorker(addressId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function setDefaultAddressWorker(addressId: number): Promise<string> {
  return getRequest<string>(`/users/address/set-default/${addressId}`, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updateAddressAction = createAsyncThunk<string, IAddress>(
  "update_address",
  (address, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return updateAddressWorker(address)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function updateAddressWorker(address: IAddress): Promise<string> {
  return putRequest<string>(`/users/address/${address.id}`, address, {
    auth: true,
  })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const deleteAddressAction = createAsyncThunk<string, number>(
  "delete_address",
  (addressId, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    return deleteAddressWorker(addressId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err))
      .finally(() => thunkApi.dispatch(setLoading(false)));
  }
);

function deleteAddressWorker(addressId: number): Promise<string> {
  return deleteRequest<string>(`/users/address/${addressId}`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const loginAction = createAsyncThunk<
  IAuthenticationResponse,
  LoginPostData
>("auth/login", (data, thunkApi) => {
  return loginWorker(data)
    .then((res) => {
      window.localStorage.setItem("jwt", res.token);
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    });
});

export function loginWorker(
  loginData: LoginPostData
): Promise<IAuthenticationResponse> {
  return postRequest<IAuthenticationResponse>("/auth/login", loginData)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const registerAction = createAsyncThunk<
  IAuthenticationResponse,
  SignUpPostData
>("auth/register", (data, thunkApi) => {
  return registerWorker(data)
    .then((res) => {
      window.localStorage.setItem("jwt", res.token);
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    });
});

export function registerWorker(
  signUpData: SignUpPostData
): Promise<IAuthenticationResponse> {
  return postRequest<IAuthenticationResponse>("/auth/register", signUpData)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
