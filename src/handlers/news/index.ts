import { create } from "./create.post";
import { findMany } from "./findMany.get";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";

export const newsHandler: IHandler[] = [
  {
    path: BASE_PATH.NEWS,
    method: REST_METHOD.POST,
    handler: create,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN, MAP_MIDDLEWARES.ROLE(Role.ADMIN)],
  },
  {
    path: BASE_PATH.NEWS,
    method: REST_METHOD.GET,
    handler: findMany,
    middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  },
];
