import { loginHandler } from "./login.post";
import { registerHandler } from "./register.post";
import { IHandler } from "../types";

export const authHandler: IHandler[] = [
  loginHandler,
  registerHandler,
];
