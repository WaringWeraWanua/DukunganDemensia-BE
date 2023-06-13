import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserUsecase, userUsecase } from "../../usecases";
import { CONFIG } from "../../configs";
import { RespLogin, ReqLoginSchema } from "../../contracts";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
