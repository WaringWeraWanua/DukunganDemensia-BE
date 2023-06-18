import { z } from "zod";
import { zoa } from "../utils";
import { BaseResponseSchema } from "./base";
import type { LocationModel } from "../models";

export const LocationDAO = zoa
  .object({
    id: zoa.string().openapi({
      description: "location's id",
      example: "1",
    }),
    createdAt: zoa.date().openapi({
      description: "location's created at",
      example: "2021-08-01T00:00:00.000Z",
    }),
    updatedAt: zoa.date().openapi({
      description: "location's updated at",
      example: "2021-08-01T00:00:00.000Z",
    }),
    latitude: zoa.number().openapi({
      description: "location's latitude",
      example: -6.123456,
    }),
    longitude: zoa.number().openapi({
      description: "location's longitude",
      example: 106.123456,
    }),
    patientId: zoa.string().openapi({
      description: "location's patient id",
      example: "1",
    }),
  })
  .openapi("LocationDAO");
export type LocationDAOType = z.infer<typeof LocationDAO>;

export const ReqUpdateLocationSchema = zoa
  .object({
    latitude: zoa.number().openapi({
      description: "location's latitude",
      example: -6.123456,
    }),
    longitude: zoa.number().openapi({
      description: "location's longitude",
      example: 106.123456,
    }),
  })
  .openapi("ReqUpdateLocation");
export type ReqUpdateLocationSchemaType = z.infer<
  typeof ReqUpdateLocationSchema
>;

export const RespUpdateLocationSchemaData = LocationDAO;
export type RespUpdateLocationSchemaDataType = z.infer<
  typeof RespUpdateLocationSchemaData
>;

export const RespUpdateLocationSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespUpdateLocationSchemaData.optional(),
    })
    .openapi("RespUpdateLocation")
);
export type RespUpdateLocationSchemaType = z.infer<
  typeof RespUpdateLocationSchema
>;

const RespGetLocationSchemaData = LocationDAO;
export type RespGetLocationSchemaDataType = z.infer<
  typeof RespGetLocationSchemaData
>;

export const RespGetLocationSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespGetLocationSchemaData.optional(),
    })
    .openapi("RespGetLocation")
);
export type RespGetLocationSchemaType = z.infer<typeof RespGetLocationSchema>;
