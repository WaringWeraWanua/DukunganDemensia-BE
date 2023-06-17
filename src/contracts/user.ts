import { z } from "zod";
import type { UserModel } from "../models";
import { BaseResponse } from "./base";

export type RespGetProfileData = UserModel;
export type RespGetProfile = BaseResponse<RespGetProfileData>;
