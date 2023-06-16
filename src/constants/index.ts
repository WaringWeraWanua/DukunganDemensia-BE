export const REST_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
} as const;

export type REST_METHOD_KEYS = keyof typeof REST_METHOD
export type REST_METHOD_VALUES = typeof REST_METHOD[REST_METHOD_KEYS]

export const BASE_PATH = {
  AUTH: "/auth",
  NEWS: "/news",
  LOCATION: "/location",
  EVENT: "/event",
} as const;

export type BASE_PATH_KEYS = keyof typeof BASE_PATH
export type BASE_PATH_VALUES = typeof BASE_PATH[BASE_PATH_KEYS]
