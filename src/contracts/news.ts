import { z } from "zod";
import { BaseResponse } from "./base";
import type { NewsModel } from "../models";

export const ReqCreateNewsSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
});

export type ReqCreateNewsSchemaType = z.infer<typeof ReqCreateNewsSchema>;

export type RespCreateNewsData = NewsModel;
export type RespCreateNews = BaseResponse<RespCreateNewsData>;

export type RespFindManyNewsData = NewsModel[];
export type RespFindManyNews = BaseResponse<RespFindManyNewsData>;

