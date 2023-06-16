import { Request, Response } from "express";
import { IUserMiddleware } from "../../middlewares";
import { locationUsecase, careRelationUsecase } from "../../usecases";
import { GetLocationPatient } from "../../contracts/location";
import { Role } from "@prisma/client"

const findPatientId = async (role: Role, user: IUserMiddleware) => {
  switch (role) {
    case Role.CARE_GIVER: {
      const patient = await careRelationUsecase.findByCareGiverId(user.id);
      if (!patient) {
        return null;
      }
      return patient.patientId;
    }
    case Role.PATIENT: {
      return user.id;
    }
    default: {
      return null;
    }
  }
}

export const getLocPatient = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    res.status(401).send("Please authenticate");
    return;
  }

  const patientId = await findPatientId(user.role, user);
  if (!patientId) {
    res.status(404).send("No patient found");
    return;
  }

  const location = await locationUsecase.findPatientLocation(patientId);
  if (!location) {
    res.status(404).send("No location found");
    return;
  }

  const response: GetLocationPatient = {
    success: true,
    data: {
      patientId: location.patientId,
      location: location,
    },
    message: "Get location patient successfully",
  }
  res.json(response);
};
