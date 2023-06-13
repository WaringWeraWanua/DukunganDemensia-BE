import { Request, Response } from "express";
import { locationUsecase } from "../../usecases";
import { ReqUpdateLocationSchema } from "../../contracts/location";
import { UserModel } from "../../models";

export const updateLocation = async (req: Request, res: Response) => {
  const user: UserModel | null = req.body.user;
  if (!user) {
    res.status(401).send("Please authenticate");
    return;
  }

  const parsed = ReqUpdateLocationSchema.safeParse(req.body);
  if (!parsed.success) {
    const response = {
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
  const response = {
    success: true,
    data: location,
    message: "Location updated successfully",
  };

  res.json(response);
};
