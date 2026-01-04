import { IRootModel } from "./rootModel";

export interface IDevice extends IRootModel {
  name: string;
  status: "active" | "inactive" | "maintenance";
  fertilizerVolume: number;
  fertilizeType:
    | "NPK"
    | "UREA"
    | "DOLOMIT"
    | "MOP"
    | "KIESERITE"
    | "ROCK PHOSPHATE";
  speed: number;
  token: string;
}

export interface IDeviceCreateRequest {
  name: string;
  status: "active" | "inactive" | "maintenance";
  fertilizerVolume: number;
  fertilizeType:
    | "NPK"
    | "UREA"
    | "DOLOMIT"
    | "MOP"
    | "KIESERITE"
    | "ROCK PHOSPHATE";
  speed: number;
}

export interface IDeviceUpdateRequest {
  id: number;
  name?: string;
  status?: "active" | "inactive" | "maintenance";
  fertilizerVolume?: number;
  fertilizeType?:
    | "NPK"
    | "UREA"
    | "DOLOMIT"
    | "MOP"
    | "KIESERITE"
    | "ROCK PHOSPHATE";
  speed?: number;
}
