import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return {
    salt,
    hashed,
  };
};
