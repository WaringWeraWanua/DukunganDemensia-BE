import { authMiddleware } from "./auth";
import { genRoleMiddleware } from "./role";

export const MAP_MIDDLEWARES = {
  NEED_LOGIN: authMiddleware,
  DEFAULT_MIDDLEWARES: [],
  ROLE: genRoleMiddleware,
} as const;

export * from "./auth";
export * from "./role";
