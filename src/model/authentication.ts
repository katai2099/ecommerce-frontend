import { Role } from "./user";

export interface IJWTToken {
  token: string;
}

export class LoginPostData {
  public email = "defString";
  public password = "defString";
}

export class SignUpPostData {
  constructor(
    public firstname: string = "",
    public lastname: string = "",
    public email: string = "",
    public password: string = ""
  ) {}
}

export interface IAuthenticationResponse {
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  token: string;
}
