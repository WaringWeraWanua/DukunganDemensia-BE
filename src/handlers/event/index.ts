import { fetchEventHandler } from "./fetch.get";
import { createEventHandler } from "./create.post";
import { setImageUrlHandler } from "./setImageUrl.patch";
import { setDoneTimeHandler } from "./setDoneTime.patch";
import { updateHandler } from "./update.put";
import { IHandler } from "../types";

export const eventHandler: IHandler[] = [
  fetchEventHandler,
  createEventHandler,
  setImageUrlHandler,
  setDoneTimeHandler,
  updateHandler,
];
