import { Request, Response } from "express";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { locationUsecase, careRelationUsecase } from "../../usecases";
import {
  RespGetLocationSchema,
  RespGetLocationSchemaType,
} from "../../contracts";
import { Role } from "@prisma/client";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";

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
    const response: RespGetLocationSchemaType = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    };
    res.status(401).json(response);
    return;
  }

  const patientId = await findPatientId(user.role, user);
  if (!patientId) {
    const response: RespGetLocationSchemaType = {
      success: false,
      message: "No patient found",
      error: "No patient found",
    };
    res.status(404).json(response);
    return;
  }

  const location = await locationUsecase.findPatientLocation(patientId);
  if (!location) {
    const response: RespGetLocationSchemaType = {
      success: false,
      message: "No location found",
      error: "No location found",
    };
    res.status(404).json(response);
    return;
  }

  const response: RespGetLocationSchemaType = {
    success: true,
    data: location,
    message: "Get location patient successfully",
  };
  res.json(response);
};

export const getLocPatientHandler: IHandler = {
  path: BASE_PATH.LOCATION,
  method: REST_METHOD.GET,
  handler: getLocPatient,
  middlewares: [
    MAP_MIDDLEWARES.NEED_LOGIN,
    MAP_MIDDLEWARES.ROLE(Role.CARE_GIVER, Role.PATIENT),
  ],
  request: {},
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespGetLocationSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: RespGetLocationSchema,
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: RespGetLocationSchema,
        },
      },
    },
  },
};
