import { IRootModel } from "./rootModel";

export interface IDevice extends IRootModel {
  name: string;
  status: "active" | "inactive" | "maintenance";
  fertilizerVolume: number;
  distance: number;
}

export interface IDeviceCreateRequest {
  name: string;
  status: "active" | "inactive" | "maintenance";
  fertilizerVolume: number;
  distance: number;
}

export interface IDeviceUpdateRequest {
  id: number;
  name?: string;
  status?: "active" | "inactive" | "maintenance";
  fertilizerVolume?: number;
  distance?: number;
}
