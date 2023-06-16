import { EventModel } from "../models";
import { BaseResponse } from "./base";

export type RespFetchEventData = {
  patientId: string;
  careGiverId: string;
  events: EventModel[];
};
export type RespFetchEvent = BaseResponse<RespFetchEventData>;
