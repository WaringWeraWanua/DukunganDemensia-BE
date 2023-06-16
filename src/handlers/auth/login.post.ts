import { Request, Response } from "express";
import { userUsecase } from "../../usecases";
import { RespLogin, ReqLoginSchema } from "../../contracts";

export const login = async (req: Request, res: Response) => {
  const parsed = ReqLoginSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespLogin = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const result = await userUsecase.login(parsed.data);

  const response = {
    success: true,
    data: result,
    message: "Login successfully",
  };
  res.json(response);
};
