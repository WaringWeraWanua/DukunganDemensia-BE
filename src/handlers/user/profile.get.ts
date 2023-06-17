import { userUsecase } from "../../usecases";
import { Request, Response } from "express";
import { RespGetProfile } from "../../contracts";
import { IUserMiddleware } from "../../middlewares";

export const profile = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    const response: RespGetProfile = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    };
    res.status(401).json(response);
    return;
  }

  const profile = await userUsecase.findOne(user.id);
  if (!profile) {
    const response: RespGetProfile = {
      success: false,
      message: "No profile found",
      error: "No profile found",
    };
    res.status(404).json(response);
    return;
  }

  const response: RespGetProfile = {
    success: true,
    data: profile,
    message: "News found successfully",
  };
  res.json(response);
};
