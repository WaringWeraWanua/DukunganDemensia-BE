import { findManyHandler } from "./findMany.get";
import { IHandler } from "../types";
import { createNewsHandler } from "./create.post";

export const newsHandler: IHandler[] = [createNewsHandler, findManyHandler];
