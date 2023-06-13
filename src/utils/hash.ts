import bcrypt from "bcrypt";
import { CONFIG } from "../configs";

export const hash = async (password: string) => {
  const salt = await bcrypt.genSalt(CONFIG.SALT_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);

  return {
    salt,
    hashed,
  };
};

export const verifyHash = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
