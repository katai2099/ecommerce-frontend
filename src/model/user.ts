export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
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
