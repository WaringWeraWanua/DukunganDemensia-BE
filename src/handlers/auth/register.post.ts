import { Request, Response } from "express";
import { userUsecase } from "../../usecases";
import { ReqRegisterSchema, RespRegister } from "../../contracts";

export const register = async (req: Request, res: Response) => {
  const parsed = ReqRegisterSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespRegister = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const user = await userUsecase.register(parsed.data);
  const response: RespRegister = {
    success: true,
    data: user,
    message: "User created successfully",
  };
  res.json(response);
};
