import {
  addAddressAction,
  deleteAddressAction,
  forgotPasswordAction,
  getAddressesAction,
  loginAction,
  registerAction,
  resetPasswordAction,
  setDefaultAddressAction,
  updateAddressAction,
  updatePasswordAction,
  updateUserDetailsAction,
  verifyResetPasswordTokenAction,
} from "../actions/userActions";
import {
  LoginPostData,
  RegistrationForm,
  RegistrationPostData,
} from "../model/authentication";
import { IAddress, IUserDetailsRequest } from "../model/user";
import { setLoading } from "../reducers/guiReducer";
import { store } from "../store/configureStore";
import { validateEmailRegex } from "./utils";

export function forgetPassword(email: string) {
  return store
    .dispatch(forgotPasswordAction(email))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function verifyResetPasswordToken(token: string) {
  store.dispatch(setLoading(true));
  return store
    .dispatch(verifyResetPasswordTokenAction(token))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
    .finally(() => store.dispatch(setLoading(false)));
}

export function resetPassword(password: string, token: string) {
  return store
    .dispatch(resetPasswordAction({ token: token, password: btoa(password) }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function login(email: string, password: string) {
  const data = new LoginPostData();
  data.password = btoa(password.trim());
  data.email = btoa(email.trim());
  const deviceId = localStorage.getItem("deviceId");

  return store
    .dispatch(loginAction({ signInData: data, deviceId: deviceId! }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getAddresses() {
  return store
    .dispatch(getAddressesAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function updatePassword(password: string) {
  return store
    .dispatch(updatePasswordAction(btoa(password)))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function updateUserDetails(userDetails: IUserDetailsRequest) {
  return store
    .dispatch(updateUserDetailsAction(userDetails))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function register(registrationForm: RegistrationForm) {
  const data = new RegistrationPostData();
  data.email = registrationForm.email;
  data.firstname = registrationForm.firstname;
  data.lastname = registrationForm.lastname;
  data.password = btoa(registrationForm.password);
  const deviceId = localStorage.getItem("deviceId");
  return store
    .dispatch(registerAction({ signUpData: data, deviceId: deviceId! }))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function setAddressAsDefault(addressId: number): Promise<string> {
  return store
    .dispatch(setDefaultAddressAction(addressId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function addNewAddress(address: IAddress) {
  return store
    .dispatch(addAddressAction(address))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function updateAddress(address: IAddress) {
  return store
    .dispatch(updateAddressAction(address))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function deleteAddress(addressId: number) {
  return store
    .dispatch(deleteAddressAction(addressId))
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function getUserAddresses(): Promise<IAddress[]> {
  return store
    .dispatch(getAddressesAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function validateEmail(email: string) {
  let error = "";
  if (email.trim().length === 0) {
    error = "Email is required";
  } else if (!validateEmailRegex(email)) {
    error = "Please enter a valid email";
  }
  return error;
}

export function validatePassword(password: string) {
  let error = "";
  if (password.trim().length === 0) {
    error = "Password is required";
  }
  return error;
}

export function validateFirstname(firstname: string) {
  if (firstname.trim().length === 0) {
    return "Firstname is required";
  }
  return "";
}

export function validateLastname(lastname: string) {
  if (lastname.trim().length === 0) {
    return "Lastname is required";
  }
  return "";
}

export function validateRetypePassword(
  retypePassword: string,
  password: string,
  errorText?: string
) {
  if (retypePassword.trim().length === 0) {
    return errorText ? errorText : "Retype password is required";
  }
  if (
    password.trim().length !== 0 &&
    retypePassword.trim() !== password.trim()
  ) {
    return "Passwords do not match";
  }
  return "";
}

export function validateRegistrationData(
  registrationForm: RegistrationForm
): RegistrationForm {
  const error: RegistrationForm = new RegistrationForm();
  error.firstname = validateFirstname(registrationForm.firstname);
  error.lastname = validateLastname(registrationForm.lastname);
  error.email = validateEmail(registrationForm.email);
  error.password = validatePassword(registrationForm.password);
  error.retypePassword = validateRetypePassword(
    registrationForm.retypePassword,
    registrationForm.password
  );
  return error;
}

export function validateAddress(
  address: IAddress
): Record<keyof IAddress, string> {
  const error: Record<keyof IAddress, string> = {
    id: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    street: "",
    houseNumber: "",
    city: "",
    country: "",
    zipCode: "",
    isDefault: "",
  };
  if (address.firstname.trim().length === 0) {
    error.firstname = "Firstname is required";
  }
  if (address.lastname.trim().length === 0) {
    error.lastname = "Lastname is required";
  }
  if (address.phoneNumber.trim().length === 0) {
    error.phoneNumber = "Phone number is required";
  }
  if (address.street.trim().length === 0) {
    error.street = "Street is required";
  }
  if (address.houseNumber.trim().length === 0) {
    error.houseNumber = "House number is required";
  }
  if (address.city.trim().length === 0) {
    error.city = "City is required";
  }
  if (address.country.trim().length === 0) {
    error.country = "Country is required";
  }
  if (address.zipCode.trim().length === 0) {
    error.zipCode = "Zip is required";
  }
  return error;
}
