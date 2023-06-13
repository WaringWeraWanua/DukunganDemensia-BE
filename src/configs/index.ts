export const CONFIG = {
  SECRET_KEY: process.env.SECRET_KEY || "secret123",
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || "10"),
} as const;
