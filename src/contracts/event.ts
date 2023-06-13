import { z } from "zod";
import { EventModel } from "../models";
import { BaseResponse } from "./base";

export const ReqFetchEventSchema = z.object({
  patientId: z.string().or(z.undefined()),
});
export type ReqFetchEventSchemaType = z.infer<typeof ReqFetchEventSchema>;

export type RespFetchEventData = {
  patientId: string;
  careGiverId: string;
  events: EventModel[];
};
export type RespFetchEvent = BaseResponse<RespFetchEventData>;
