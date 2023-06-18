import { z } from "zod";
import { zoa } from "../utils";

export const BaseResponseSchema = zoa.object({
  success: zoa.boolean(),
  message: zoa.string(),
  error: zoa.string().optional(),
});
export type BaseResponseSchemaType = z.infer<typeof BaseResponseSchema>;
