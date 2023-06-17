import { updateLocation } from "./update.put";
import { getLocPatient } from "./get_loc_patient.get";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";

export const locationHandler: IHandler[] = [
  {
    path: BASE_PATH.LOCATION,
    method: REST_METHOD.PUT,
    handler: updateLocation,
    middlewares: [
      MAP_MIDDLEWARES.NEED_LOGIN,
      MAP_MIDDLEWARES.ROLE(Role.PATIENT),
    ],
  },
  {
    path: BASE_PATH.LOCATION,
    method: REST_METHOD.GET,
    handler: getLocPatient,
    middlewares: [
      MAP_MIDDLEWARES.NEED_LOGIN,
      MAP_MIDDLEWARES.ROLE(Role.CARE_GIVER, Role.PATIENT),
    ],
  },
];
