import { authMiddleware } from "./auth";
import { errorMiddleware } from "./error";

export const MAP_MIDDLEWARES = {
  NEED_LOGIN: authMiddleware,
  DEFAULT_MIDDLEWARES: [errorMiddleware],
} as const;

export * from "./error";
export * from "./auth";
