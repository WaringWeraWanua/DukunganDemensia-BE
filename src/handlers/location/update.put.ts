import { Request, Response } from "express";
import { locationUsecase } from "../../usecases";
import {
  ReqUpdateLocationSchema,
  RespUpdateLocationSchema,
  RespUpdateLocationSchemaType,
} from "../../contracts";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { Role } from "@prisma/client";

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const user: IUserMiddleware | null = req.body.user;
    if (!user) {
      const response: RespUpdateLocationSchemaType = {
        success: false,
        message: "Please authenticate",
        error: "Please authenticate",
      };
      res.status(401).json(response);
      return;
    }

    const parsed = ReqUpdateLocationSchema.safeParse(req.body);
    if (!parsed.success) {
      const response: RespUpdateLocationSchemaType = {
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
    const response: RespUpdateLocationSchemaType = {
      success: true,
      data: location,
      message: "Location updated successfully",
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    const response = {
      success: false,
      message: (error as Error)?.message || "Unknown error",
      error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };
    res.status(400).json(response);
  }
};

export const updateLocationHandler: IHandler = {
  path: BASE_PATH.LOCATION,
  method: REST_METHOD.PUT,
  handler: updateLocation,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN, MAP_MIDDLEWARES.ROLE(Role.PATIENT)],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqUpdateLocationSchema,
        },
      },
      required: true,
      description: "Update location request body",
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespUpdateLocationSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
      content: {
        "application/json": {
          schema: RespUpdateLocationSchema,
        },
      },
    },
    401: {
      description: "Please authenticate",
      content: {
        "application/json": {
          schema: RespUpdateLocationSchema,
        },
      },
    },
  },
};
