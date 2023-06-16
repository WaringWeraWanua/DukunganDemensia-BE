import { Request, Response } from "express";
import { IUserMiddleware } from "../../middlewares";
import { RespFetchEvent } from "../../contracts/event";
import { careRelationUsecase, eventUsecase } from "../../usecases";

export const fetch = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    const response: RespFetchEvent = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    }
    res.status(401).json(response);
    return;
  }

  const careRelation = await careRelationUsecase.findByUserMiddleware(user);
  if (!careRelation) {
    const response: RespFetchEvent = {
      success: false,
      message: "No patient found",
      error: "No patient found",
    }
    res.status(404).json(response);
    return;
  }

  const events = await eventUsecase.findByCareRelationId(careRelation.id);

  const response: RespFetchEvent = {
    success: true,
    data: {
      events,
      careGiverId: careRelation.id,
      patientId: careRelation.patientId,
    },
    message: "Get events successfully",
  };
  res.json(response);
};
