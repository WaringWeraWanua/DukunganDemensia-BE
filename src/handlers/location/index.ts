import { updateLocationHandler } from "./update.put";
import { IHandler } from "../types";
import { getLocPatientHandler } from "./get_loc_patient.get";

export const locationHandler: IHandler[] = [
  updateLocationHandler,
  getLocPatientHandler,
];
