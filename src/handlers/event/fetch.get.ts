import { Request, Response } from "express";
import { IUserMiddleware } from "../../middlewares";
import { RespFetchEvent } from "../../contracts/event";
import { careRelationUsecase, eventUsecase } from "../../usecases";
import { Role } from "@prisma/client";

const findCareRelation = async (user: IUserMiddleware) => {
  switch (user.role) {
    case Role.CARE_GIVER: {
      const careRelation = await careRelationUsecase.findByCareGiverId(user.id);
      if (!careRelation) {
        return null;
      }
      return careRelation;
    }
    case Role.PATIENT: {
      const careRelation = await careRelationUsecase.findByPatientId(user.id);
      if (!careRelation) {
        return null;
      }
      return careRelation;
    }
    default: {
      return null;
    }
  }
};

export const fetch = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    res.status(401).send("Please authenticate");
    return;
  }

  const careRelation = await findCareRelation(user);
  if (!careRelation) {
    res.status(404).send("No patient found");
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
