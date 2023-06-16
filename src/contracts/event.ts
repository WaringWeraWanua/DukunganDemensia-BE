import { z } from "zod";
import { EventModel } from "../models";
import { BaseResponse } from "./base";

export type RespFetchEventData = {
  patientId: string;
  careGiverId: string;
  events: EventModel[];
};
export type RespFetchEvent = BaseResponse<RespFetchEventData>;

export const ReqCreateEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  startNotifTime: z.coerce.date(),
});
export type ReqCreateEventType = z.infer<typeof ReqCreateEventSchema>;

export type RespCreateEventData = EventModel;
export type RespCreateEvent = BaseResponse<RespCreateEventData>;

export const ReqSetImageUrlSchema = z.object({
  imageUrl: z.string(),
});
export type ReqSetImageUrlType = z.infer<typeof ReqSetImageUrlSchema>;

export type RespSetImageUrlData = EventModel;
export type RespSetImageUrl = BaseResponse<RespSetImageUrlData>;
