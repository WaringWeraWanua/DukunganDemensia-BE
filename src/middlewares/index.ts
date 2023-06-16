import { authMiddleware } from "./auth";
import { errorMiddleware } from "./error";
import { genRoleMiddleware } from "./role";

export const MAP_MIDDLEWARES = {
  NEED_LOGIN: authMiddleware,
  DEFAULT_MIDDLEWARES: [errorMiddleware],
  ROLE: genRoleMiddleware,
} as const;

export * from "./error";
export * from "./auth";
export * from "./role";
