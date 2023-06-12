import { login } from "./login.post";
import { IHandler } from "../types";
import { REST_METHOD, BASE_PATH } from "../../constants";

export const authHandler: IHandler[] = [
  {
    path: BASE_PATH.AUTH + "/login",
    method: REST_METHOD.POST,
    handler: login,
  },
];
