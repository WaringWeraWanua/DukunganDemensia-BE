import { Request, Response } from "express";
import { locationUsecase } from "../../usecases";
import { ReqUpdateLocationSchema, RespUpdateLocation } from "../../contracts/location";
import { IUserMiddleware } from "../../middlewares";

export const updateLocation = async (req: Request, res: Response) => {
  const user: IUserMiddleware | null = req.body.user;
  if (!user) {
    const response: RespUpdateLocation = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    };
    res.status(401).json(response);
    return;
  }

  const parsed = ReqUpdateLocationSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: RespUpdateLocation = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };
    res.status(400).json(response);
    return;
  }

  const location = await locationUsecase.upsert({
    ...parsed.data,
    patientId: user.id,
  });
  const response: RespUpdateLocation = {
    success: true,
    data: location,
    message: "Location updated successfully",
  };

  res.json(response);
};
