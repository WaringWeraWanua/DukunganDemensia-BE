import { profileHandler } from "./profile.get";
import { pairHandler } from "./pair.get";
import { IHandler } from "../types";

export const userHandler: IHandler[] = [profileHandler, pairHandler];
