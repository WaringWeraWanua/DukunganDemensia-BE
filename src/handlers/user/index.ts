import { profile } from "./profile.get";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";

export const userHandler: IHandler[] = [
  {
    path: BASE_PATH.USER + "/self",
    method: REST_METHOD.GET,
    handler: profile,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  },
];
