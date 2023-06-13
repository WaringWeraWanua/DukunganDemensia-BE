import { Request, Response } from "express";
import { IUserMiddleware } from "../../middlewares";
import { ReqFetchEventSchema, RespFetchEvent } from "../../contracts/event";
import { careRelationUsecase, eventUsecase } from "../../usecases";
import { Role } from "@prisma/client";

export const fetch = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    res.status(401).send("Please authenticate");
    return;
  }

  let careRelationId;
  let patientId;
  let careGiverId;
  switch (user.role) {
    case Role.CARE_GIVER: {
      careGiverId = user.id;

      const parsed = ReqFetchEventSchema.safeParse(req.query);
      if (!parsed.success) {
        const response: RespFetchEvent = {
          success: false,
          message: "Invalid request body",
          error: parsed.error.message,
        };

        res.status(400).json(response);
        return;
      }

      if (!parsed.data.patientId) {
        const careRelations = await careRelationUsecase.findByCareGiverId(
          user.id
        );

        if (careRelations.length === 0) {
          res.status(404).send("No patient found");
          return;
        }

        // TODO: confirm --> only check for the first patient
        careRelationId = careRelations[0].id;
        patientId = careRelations[0].patientId;
      } else {
        const careRelation = await careRelationUsecase.findByPatientId(
          parsed.data.patientId
        );

        if (!careRelation) {
          res.status(404).send("No patient found");
          return;
        }

        careRelationId = careRelation.id;
        patientId = careRelation.patientId;
      }
    }
    case Role.PATIENT: {
      patientId = user.id;

      const careRelation = await careRelationUsecase.findByPatientId(user.id);
      if (!careRelation) {
        res.status(404).send("No patient found");
        return;
      }

      careRelationId = careRelation.id;
      careGiverId = careRelation.careGiverId;
    }
  }

  if (!careRelationId || !patientId || !careGiverId) {
    res.status(404).send("No patient found");
    return;
  }

  const events = await eventUsecase.findByCareRelationId(careRelationId);

  const response: RespFetchEvent = {
    success: true,
    data: {
      events,
      patientId,
      careGiverId,
    },
    message: "Get events successfully",
  };

  res.json(response);
};
