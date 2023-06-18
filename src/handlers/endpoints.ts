import { REST_METHOD_VALUES } from "../constants";
import { REST_METHOD, BASE_PATH } from "../constants";

export const ENDPOINTS = {
  USER: {
    PROFILE: {
      path: BASE_PATH.USER + "/self",
      method: REST_METHOD.GET,
    },
  },
  NEWS: {
    CREATE: {
      path: BASE_PATH.NEWS,
      method: REST_METHOD.POST,
    },
    FIND_MANY: {
      path: BASE_PATH.NEWS,
      method: REST_METHOD.GET,
    },
  },
  LOCATION: {
    UPDATE: {
      path: BASE_PATH.LOCATION,
      method: REST_METHOD.PUT,
    },
    GET_LOC_PATIENT: {
      path: BASE_PATH.LOCATION,
      method: REST_METHOD.GET,
    },
  },
  EVENT: {
    CREATE: {
      path: BASE_PATH.EVENT,
      method: REST_METHOD.POST,
    },
    FETCH: {
      path: BASE_PATH.EVENT,
      method: REST_METHOD.GET,
    },
    SET_DONE_TIME: {
      path: BASE_PATH.EVENT + "/:id/doneTime",
      method: REST_METHOD.PATCH,
    },
    SET_IMAGE_URL: {
      path: BASE_PATH.EVENT + "/:id/proofImageUrl",
      method: REST_METHOD.PATCH,
    },
    UPDATE: {
      path: BASE_PATH.EVENT + "/:id",
      method: REST_METHOD.PUT,
    },
  },
  AUTH: {
    LOGIN: {
      path: BASE_PATH.AUTH + "/login",
      method: REST_METHOD.POST,
    },
    REGISTER: {
      path: BASE_PATH.AUTH + "/register",
      method: REST_METHOD.POST,
    },
  },
} as const;
