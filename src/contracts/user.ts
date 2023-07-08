import { z } from "zod";
import { registry, zoa } from "../utils";
import { BaseResponseSchema } from "./base";
import { Role } from "@prisma/client";

export const UserDAO = zoa
  .object({
    id: zoa.string().openapi({
      description: "user's id",
      example: "1",
    }),
    createdAt: zoa.date().openapi({
      description: "user's created at",
      example: "2021-08-01T00:00:00.000Z",
    }),
    updatedAt: zoa.date().openapi({
      description: "user's updated at",
      example: "2021-08-01T00:00:00.000Z",
    }),
    name: zoa.string().openapi({
      description: "user's name",
      example: "John Doe",
    }),
    email: zoa.string().openapi({
      description: "user's email",
      example: "johndoe@gmail.com",
    }),
    username: zoa.string().openapi({
      description: "user's username",
      example: "johndoe",
    }),
    phoneNumber: zoa.string().openapi({
      description: "user's phone number",
      example: "08123456789",
    }),
    role: zoa.enum([Role.ADMIN, Role.PATIENT, Role.CARE_GIVER]).openapi({
      description: "user's role",
      example: Role.PATIENT,
    }),
  })
  .openapi("UserDAO");

export const RespGetProfileData = UserDAO.openapi("RespGetProfileData");
export type RespGetProfileDataType = z.infer<typeof RespGetProfileData>;

export const RespGetProfileSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespGetProfileData.optional(),
    })
    .openapi("RespGetProfile")
).openapi("RespGetProfile");
export type RespGetProfileSchemaType = z.infer<typeof RespGetProfileSchema>;

export const RespGetPairData = UserDAO.openapi("RespGetProfileData");
export type RespGetPairDataType = z.infer<typeof RespGetProfileData>;

export const RespGetPairSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespGetProfileData.optional(),
    })
    .openapi("RespGetPair")
).openapi("RespGetPair");
export type RespGetPairSchemaType = z.infer<typeof RespGetProfileSchema>;

registry.register("UserDAO", UserDAO);
registry.register("RespGetProfile", RespGetProfileSchema);
registry.register("RespGetPair", RespGetPairSchema);
