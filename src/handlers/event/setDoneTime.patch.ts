import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import { ReqSetDoneTimeUrlSchema, RespSetDoneTime } from "../../contracts";
import { IUserMiddleware } from "../../middlewares";
import { Role } from "@prisma/client";

export const setDoneTime = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user || user.role !== Role.CARE_GIVER) {
    const response: RespSetDoneTime = {
      success: false,
      message: "Please authenticate as patient",
      error: "Please authenticate as patient",
    };
    res.status(401).json(response);
    return;
  }

  const eventId = req.params.id;

  const parsed = ReqSetDoneTimeUrlSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: RespSetDoneTime = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };
    res.status(400).json(response);
    return;
  }

  const updated = await eventUsecase.updateDoneTime({
    careGiverId: user.id,
    eventId,
    doneTime: new Date(parsed.data.imageUrl),
  });
  if (!updated) {
    const response: RespSetDoneTime = {
      success: false,
      message: "Failed to update done time",
      error: "Failed to update done time",
    };
    res.status(404).json(response);
    return;
  }

  const response: RespSetDoneTime = {
    success: true,
    data: updated,
    message: "Done time updated successfully",
  };
  res.json(response);
};
