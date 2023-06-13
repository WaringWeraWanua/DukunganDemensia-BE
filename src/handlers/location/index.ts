import { updateLocation } from "./update.post";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";

export const locationHandler: IHandler[] = [
  {
    path: BASE_PATH.LOCATION,
    method: REST_METHOD.PUT,
    handler: updateLocation,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  },
];
