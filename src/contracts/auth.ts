import { z } from "zod";
import { zoa } from "../utils";
import { BaseResponseSchema } from "./base";
import { Role } from "@prisma/client";
import { UserDAO } from "./user";
import { registry } from "../utils";

export const ReqLoginSchema = zoa
  .object({
    username: zoa
      .string()
      .openapi({ description: "user's username", example: "johndoe" }),
    password: zoa
      .string()
      .openapi({ description: "user's password", example: "123secret" }),
  })
  .openapi("ReqLogin");
export type ReqLoginSchemaType = z.infer<typeof ReqLoginSchema>;

export const RespLoginSchemaData = z
  .object({
    token: zoa.string().openapi({
      description: "user's token",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    }),
    user: UserDAO,
  })
  .openapi("RespLogin");
export type RespLoginSchemaDataType = z.infer<typeof RespLoginSchemaData>;

export const RespLoginSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespLoginSchemaData.optional(),
    })
    .openapi("LoginData")
).openapi("RespLogin");
export type RespLoginSchemaType = z.infer<typeof RespLoginSchema>;

export const ReqRegisterSchema = zoa
  .object({
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
    password: zoa.string().openapi({
      description: "user's password",
      example: "secret-john123",
    }),
    phoneNumber: zoa.string().openapi({
      description: "user's phone number",
      example: "08123456789",
    }),
    role: zoa.enum([Role.ADMIN, Role.PATIENT, Role.CARE_GIVER]).openapi({
      description: "user's role",
      example: Role.PATIENT,
    }),
    careGiverUsername: zoa.string().optional().openapi({
      description: "care giver's username",
      example: "johndoecarer",
    }),
  })
  .openapi("ReqRegister");
export type ReqRegisterSchemaType = z.infer<typeof ReqRegisterSchema>;

export const RespRegisterSchemaData = UserDAO;
export type RespRegisterSchemaDataType = z.infer<typeof RespRegisterSchemaData>;

export const RespRegisterSchema = BaseResponseSchema.merge(
  z
    .object({
      data: RespRegisterSchemaData.optional(),
    })
    .openapi("RegisterData")
).openapi("RespRegister");
export type RespRegisterSchemaType = z.infer<typeof RespRegisterSchema>;

registry.register("RespRegister", RespRegisterSchema);
registry.register("RespLogin", RespLoginSchema);
