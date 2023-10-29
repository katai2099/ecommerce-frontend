import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../controllers/clientRequest";
import {
  IAuthenticationResponse,
  ILoginRequest,
  IRegistrationRequest,
} from "../model/authentication";
import {
  IAddress,
  IResetPasswordRequest,
  IUpdatePasswordRequest,
  IUserDetailsRequest,
} from "../model/user";
import { setLogin, updateUserDetails } from "../reducers/userReducer";
import { store } from "../store/configureStore";

export const resetPasswordAction = createAsyncThunk<
  string,
  IResetPasswordRequest
>("reset_password", (request, thunkApi) => {
  return resetPasswordWorker(request)
    .then((res) => Promise.resolve(res))
    .catch((err) => thunkApi.rejectWithValue(err));
});

function resetPasswordWorker(request: IResetPasswordRequest) {
  return postRequest<string>(`auth/reset-password?token=${request.token}`, {
    password: request.password,
  } as IUpdatePasswordRequest)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const verifyResetPasswordTokenAction = createAsyncThunk<string, string>(
  "verify_reset_password_token",
  (token, thunkApi) => {
    return verifyResetPasswordTokenWorker(token)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function verifyResetPasswordTokenWorker(token: string) {
  return getRequest<string>(`auth/verify-reset-password-token?token=${token}`)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const forgotPasswordAction = createAsyncThunk<string, string>(
  "forgot_password",
  (email, thunkApi) => {
    return forgotPasswordWorker(email)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function forgotPasswordWorker(email: string) {
  const forgotPasswordRequest = { email: email };
  return postRequest<string>(
    "auth/reset-password-request",
    forgotPasswordRequest
  )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const updatePasswordAction = createAsyncThunk<string, string>(
  "update_password",
  (password, thunkApi) => {
    const encodedUpdatePasswordRequest: IUpdatePasswordRequest = {
      password: password,
    };
    return updatePasswordWorker(encodedUpdatePasswordRequest)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
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
  return updateUserDetailsWorker(user)
    .then((res) => {
      thunkApi.dispatch(updateUserDetails(user));
      return Promise.resolve(res);
    })
    .catch((err) => thunkApi.rejectWithValue(err));
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
    return addAddressWorker(address)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
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
    return setDefaultAddressWorker(addressId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
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
    return updateAddressWorker(address)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
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
    return deleteAddressWorker(addressId)
      .then((res) => Promise.resolve(res))
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);

function deleteAddressWorker(addressId: number): Promise<string> {
  return deleteRequest<string>(`/users/address/${addressId}`, { auth: true })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const registerAction = createAsyncThunk<
  IAuthenticationResponse,
  IRegistrationRequest
>("auth/register", (data, thunkApi) => {
  return registerWorker(data)
    .then((res) => {
      window.localStorage.setItem("jwt", res.token);
      return Promise.resolve(res);
    })
    .catch((error) => thunkApi.rejectWithValue(error));
});

function registerWorker(
  signUpData: IRegistrationRequest
): Promise<IAuthenticationResponse> {
  return postRequest<IAuthenticationResponse>("/auth/register", signUpData)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const loginAction = createAsyncThunk<
  IAuthenticationResponse,
  ILoginRequest
>("auth/login", (data, thunkApi) => {
  return loginWorker(data)
    .then((res) => {
      window.localStorage.setItem("jwt", res.token);
      return Promise.resolve(res);
    })
    .catch((error) => thunkApi.rejectWithValue(error));
});

function loginWorker(
  loginData: ILoginRequest
): Promise<IAuthenticationResponse> {
  return postRequest<IAuthenticationResponse>("/auth/login", loginData)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export const logoutAction = createAsyncThunk("auth/logout", () => {
  return logoutWorker()
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));
});

function logoutWorker(): Promise<void> {
  try {
    window.localStorage.removeItem("jwt");
    store.dispatch(setLogin(false));
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}
