import { fetch } from "./fetch.get";
import { create } from "./create.post";
import { setImageUrl } from "./setImageUrl.patch";
import { setDoneTime } from "./setDoneTime.patch";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";

export const eventHandler: IHandler[] = [
  {
    path: BASE_PATH.EVENT,
    method: REST_METHOD.GET,
    handler: fetch,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  },
  {
    path: BASE_PATH.EVENT,
    method: REST_METHOD.POST,
    handler: create,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  },
  {
    path: BASE_PATH.EVENT + "/:id/proofImageUrl",
    method: REST_METHOD.PATCH,
    handler: setImageUrl,
    middlewares: [
      MAP_MIDDLEWARES.NEED_LOGIN,
      MAP_MIDDLEWARES.ROLE(Role.PATIENT),
    ],
  },
  {
    path: BASE_PATH.EVENT + "/:id/doneTime",
    method: REST_METHOD.PATCH,
    handler: setDoneTime,
    middlewares: [
      MAP_MIDDLEWARES.NEED_LOGIN,
      MAP_MIDDLEWARES.ROLE(Role.CARE_GIVER),
    ]
  }
];
