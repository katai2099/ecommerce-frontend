import { Role } from "./user";

export interface IJWTToken {
  token: string;
}

export class LoginPostData {
  public email = "";
  public password = "";
}

export class RegistrationPostData {
  constructor(
    public firstname: string = "",
    public lastname: string = "",
    public email: string = "",
    public password: string = ""
  ) {}
}

export class RegistrationForm {
  constructor(
    public firstname: string = "",
    public lastname: string = "",
    public email: string = "",
    public password: string = "",
    public retypePassword: string = ""
  ) {}
}

export interface IAuthenticationResponse {
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  token: string;
}
