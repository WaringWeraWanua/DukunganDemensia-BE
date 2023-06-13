import { fetch } from "./fetch.get";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";

export const eventHandler: IHandler[] = [
  {
    path: BASE_PATH.EVENT,
    method: REST_METHOD.GET,
    handler: fetch,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  },
];
