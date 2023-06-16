import { z } from "zod";
import { UserModel } from "../models";
import { BaseResponse } from "./base";
import { Role } from "@prisma/client";

export const ReqLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type ReqLoginSchemaType = z.infer<typeof ReqLoginSchema>;

export type RespLoginData = {
  token: string;
  user: UserModel;
};
export type RespLogin = BaseResponse<RespLoginData>;

export const ReqRegisterSchema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  phoneNumber: z.string(),
  role: z.enum([Role.ADMIN, Role.PATIENT, Role.CARE_GIVER]),
  careGiverUsername: z.string().or(z.undefined()),
});

export type ReqRegisterSchemaType = z.infer<typeof ReqRegisterSchema>;

export type RespRegisterData = UserModel;
export type RespRegister = BaseResponse<RespRegisterData>;