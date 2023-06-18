import { z } from "zod";
import { zoa } from "../utils";
import { BaseResponseSchema } from "./base";

export const NewsDAO = zoa.object({
  id: zoa.string().openapi({
    description: "news's id",
    example: "1",
  }),
  createdAt: zoa.date().openapi({
    description: "news's created at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  updatedAt: zoa.date().openapi({
    description: "news's updated at",
    example: "2021-08-01T00:00:00.000Z",
  }),
  title: zoa.string().openapi({
    description: "news's title",
    example: "News Title",
  }),
  content: zoa.string().openapi({
    description: "news's content",
    example: "News Content",
  }),
  imageUrl: zoa.string().openapi({
    description: "news's image url",
    example: "https://www.google.com",
  }),
});
export type NewsDAOType = z.infer<typeof NewsDAO>;

export const ReqCreateNewsSchema = zoa
  .object({
    title: zoa.string().openapi({
      description: "news's title",
      example: "News Title",
    }),
    content: zoa.string().openapi({
      description: "news's content",
      example: "News Content",
    }),
    imageUrl: zoa.string().openapi({
      description: "news's image url",
      example: "https://www.google.com",
    }),
  })
  .openapi("ReqCreateNews");
export type ReqCreateNewsSchemaType = z.infer<typeof ReqCreateNewsSchema>;

export const RespCreateNewsSchemaData = NewsDAO;
export type RespCreateNewsSchemaDataType = z.infer<
  typeof RespCreateNewsSchemaData
>;

export const RespCreateNewsSchema = BaseResponseSchema.merge(
  z
    .object({
      data: RespCreateNewsSchemaData.optional(),
    })
    .openapi("RespCreateNews")
);
export type RespCreateNewsSchemaType = z.infer<typeof RespCreateNewsSchema>;

export const RespFindManyNewsSchemaData = zoa.array(NewsDAO);
export type RespFindManyNewsSchemaDataType = z.infer<
  typeof RespFindManyNewsSchemaData
>;

export const RespFindManyNewsSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespFindManyNewsSchemaData.optional(),
    })
    .openapi("RespFindManyNews")
);
export type RespFindManyNewsSchemaType = z.infer<typeof RespFindManyNewsSchema>;
