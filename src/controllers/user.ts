import {
  getAddressesAction,
  loginAction,
  setDefaultAddressAction,
} from "../actions/userActions";
import { LoginPostData } from "../model/authentication";
import { IAddress } from "../model/user";
import { store } from "../store/configureStore";
import { validateEmailRegex } from "./utils";

export function login(email: string, password: string) {
  const data = new LoginPostData();
  data.password = btoa(password.trim());
  data.email = btoa(email.trim());
  return store
    .dispatch(loginAction(data))
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

export function getUserAddresses(): Promise<IAddress[]> {
  return store
    .dispatch(getAddressesAction())
    .unwrap()
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export function validateEmail(email: string) {
  let error = "";
  if (email.length === 0) {
    error = "Email is required";
  } else if (!validateEmailRegex(email)) {
    error = "Please enter a valid email";
  }
  return error;
}

export function validatePassword(password: string) {
  let error = "";
  if (password.length === 0) {
    error = "Password is required";
  }
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
    error.firstname = "Firstname cannot be empty";
  }
  if (address.lastname.trim().length === 0) {
    error.lastname = "Lastname cannot be empty";
  }
  if (address.phoneNumber.trim().length === 0) {
    error.phoneNumber = "Phone number cannot be empty";
  }
  if (address.street.trim().length === 0) {
    error.street = "Street cannot be empty";
  }
  if (address.houseNumber.trim().length === 0) {
    error.houseNumber = "House number cannot be empty";
  }
  if (address.city.trim().length === 0) {
    error.city = "City cannot be empty";
  }
  if (address.country.trim().length === 0) {
    error.country = "Country cannot be empty";
  }
  if (address.zipCode.trim().length === 0) {
    error.zipCode = "Zip cannot be empty";
  }
  return error;
}
