import { IRootModel } from "./rootModel";

export interface IUserModel extends IRootModel {
  name: string;
  email: string;
  password: string;
  role: "admin" | "spg" | "supplier";
}

export interface IUserLoginRequestModel {
  email: string;
  password: string;
}

export interface IUserTokenModel {
  userId: number;
  userName: string;
  userRole: "ADMIN" | "SUPERADMIN";
}

export interface IUserCreateRequestModel {
  userName: string;
  userContact: string;
  userPassword: string;
  userRole: "admin" | "superAdmin" | "supplier" | string;
}

export interface IUserUpdateRequestModel {
  userId: string;
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRole?: "admin" | "superAdmin" | "spg" | "supplier" | string;
  userDeviceId?: string;
  userContact?: string;
}
