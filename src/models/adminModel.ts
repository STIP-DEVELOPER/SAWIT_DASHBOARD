import { IRootModel } from "./rootModel";

export interface IAdmin extends IRootModel {
  id: number;
  name: string;
  email: string;
  role: "admin" | "superAdmin" | string;
}

export interface IAdminCreateRequest {
  name: string;
  password: string;
  email: string;
  role: "admin" | "superAdmin" | string;
}

export interface IAdminUpdateRequest {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "superAdmin" | string;
}
