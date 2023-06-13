import { updateLocation } from "./update.post";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";

export const authHandler: IHandler[] = [
  {
    path: BASE_PATH.LOCATION,
    method: REST_METHOD.PUT,
    handler: updateLocation,
    middlewares: [],
  },
];
