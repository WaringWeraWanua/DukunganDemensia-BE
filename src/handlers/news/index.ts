import { create } from "./create.post";
import { findMany } from "./findMany.get";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";

export const newsHandler: IHandler[] = [
  {
    path: BASE_PATH.NEWS,
    method: REST_METHOD.POST,
    handler: create,
  },
  {
    path: BASE_PATH.NEWS,
    method: REST_METHOD.GET,
    handler: findMany,
  },
];
