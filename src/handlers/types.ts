import { RequestHandler } from "express";
import { REST_METHOD_VALUES } from "../constants";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Prettify } from "../utils";

export type IHandler = Prettify<
  RouteConfig & {
    method: REST_METHOD_VALUES;
    handler: RequestHandler;
    middlewares: RequestHandler[];
  }
>;

export type RequestConfig = Pick<RouteConfig, "request">;
export type ResponseConfig = Pick<RouteConfig, "responses">;
