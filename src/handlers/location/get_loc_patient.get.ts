import { Request, Response } from "express";
import { IUserMiddleware } from "../../middlewares";
import { locationUsecase, careRelationUsecase } from "../../usecases";
import { GetLocationPatient } from "../../contracts";
import { Role } from "@prisma/client";

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
};

export const getLocPatient = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    const response: GetLocationPatient = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    };
    res.status(401).json(response);
    return;
  }

  const patientId = await findPatientId(user.role, user);
  if (!patientId) {
    const response: GetLocationPatient = {
      success: false,
      message: "No patient found",
      error: "No patient found",
    };
    res.status(404).json(response);
    return;
  }

  const location = await locationUsecase.findPatientLocation(patientId);
  if (!location) {
    const response: GetLocationPatient = {
      success: false,
      message: "No location found",
      error: "No location found",
    };
    res.status(404).json(response);
    return;
  }

  const response: GetLocationPatient = {
    success: true,
    data: {
      patientId: location.patientId,
      location: location,
    },
    message: "Get location patient successfully",
  };
  res.json(response);
};
