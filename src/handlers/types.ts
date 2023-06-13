import { RequestHandler } from "express";
import { REST_METHOD_VALUES } from "../constants";

export interface IHandler {
  path: string;
  method: REST_METHOD_VALUES;
  handler: RequestHandler;
  middlewares: RequestHandler[];
}
