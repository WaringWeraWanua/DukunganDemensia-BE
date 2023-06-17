import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import { ReqUpdateEventSchema, RespUpdateEvent } from "../../contracts";
import { OptionalEventModel, OptionalNonIdEventModel } from "../../models";
import { IUserMiddleware } from "../../middlewares";
import { Role } from "@prisma/client";

export const update = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user || user.role !== Role.CARE_GIVER) {
    const response: RespUpdateEvent = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    };
    res.status(401).json(response);
    return;
  }

  const parsed = ReqUpdateEventSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespUpdateEvent = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const careRelation = await careRelationUsecase.findByUserMiddleware(user);
  if (!careRelation) {
    const response: RespUpdateEvent = {
      success: false,
      message: "No patient found",
      error: "No patient found",
    };
    res.status(404).json(response);
    return;
  }

  const dated: OptionalNonIdEventModel = {
    ...parsed.data,
    id: req.params.id,
    startTime: new Date(parsed.data.startTime),
    endTime: new Date(parsed.data.endTime),
    startNotifTime: new Date(parsed.data.startNotifTime),
    proofImageUrl: null,
    doneTime: null,
    careRelationId: careRelation.id,
  };

  const event = await eventUsecase.update(dated);
  const response: RespUpdateEvent = {
    success: true,
    data: event,
    message: "Event created successfully",
  };

  res.json(response);
};
