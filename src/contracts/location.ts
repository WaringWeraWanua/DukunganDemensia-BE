import { z } from "zod";
import { BaseResponse } from "./base";
import type { LocationModel } from "../models";

export const ReqUpdateLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type ReqUpdateLocationSchemaType = z.infer<
  typeof ReqUpdateLocationSchema
>;

export type RespUpdateLocationData = LocationModel;
export type RespUpdateLocation = BaseResponse<RespUpdateLocationData>;

export type GetLocationPatientData = {
  patientId: string;
  location: LocationModel | null;
}[];
export type GetLocationPatient = BaseResponse<GetLocationPatientData>;
