export enum Role {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}

export class User implements IUser {
  constructor(
    public firstname: string = "",
    public lastname: string = "",
    public email: string = "",
    public password: string = "",
    public role: Role = Role.USER
  ) {}
}

export class UserReduxtState implements IUserReduxState {
  constructor(
    public firstname = "",
    public lastname = "",
    public email = "",
    public loggedIn = false,
    public token = "",
    public role = Role.USER
  ) {}
}

export interface IUserReduxState {
  firstname: string;
  lastname: string;
  email: string;
  loggedIn: boolean;
  token: string;
  role: Role;
}

export interface IAddress {
  id: number;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  city: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export class Address implements IAddress {
  constructor(
    public id = 0,
    public firstname = "",
    public lastname = "",
    public phoneNumber = "",
    public street = "",
    public houseNumber = "",
    public city = "",
    public country = "",
    public zipCode = "",
    public isDefault = false
  ) {}
}

export interface IUserDetailsRequest {
  firstname: string;
  lastname: string;
}

export interface IUpdatePasswordRequest {
  password: string;
}

export const initializeAddressError = (): Record<keyof IAddress, string> => {
  return {
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
};

export interface IResetPasswordRequest {
  token: string;
  password: string;
}
