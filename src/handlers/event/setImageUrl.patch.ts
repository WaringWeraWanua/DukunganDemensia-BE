import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import { ReqSetImageUrlSchema, RespCreateEvent } from "../../contracts";
import { OptionalEventModel } from "../../models";
import { IUserMiddleware } from "../../middlewares";
import { Role } from "@prisma/client";

export const setImageUrl = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user || user.role !== Role.PATIENT) {
    const response: RespCreateEvent = {
      success: false,
      message: "Please authenticate as patient",
      error: "Please authenticate as patient",
    };
    res.status(401).json(response);
    return;
  }

  const parsed = ReqSetImageUrlSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespCreateEvent = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };
    res.status(400).json(response);
    return;
  }

  const updated = await eventUsecase.updateImageUrl(parsed.data);
  if (!updated) {
    const response: RespCreateEvent = {
      success: false,
      message: "Failed to update image url",
      error: "Failed to update image url",
    };
    res.status(404).json(response);
    return;
  }

  const response: RespCreateEvent = {
    success: true,
    data: updated,
    message: "Image url updated successfully",
  };
  res.json(response);
};
