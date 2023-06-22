import { userUsecase } from "../../usecases";
import { Request, Response } from "express";
import {
  RespGetProfileSchemaType,
  RespGetProfileSchema,
} from "../../contracts";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";

export const profile = async (req: Request, res: Response) => {
  try {
    const user: IUserMiddleware | undefined = req.body.user;
    if (!user) {
      const response: RespGetProfileSchemaType = {
        success: false,
        message: "Please authenticate",
        error: "Please authenticate",
      };
      res.status(401).json(response);
      return;
    }

    const profile = await userUsecase.findOne(user.id);
    if (!profile) {
      const response: RespGetProfileSchemaType = {
        success: false,
        message: "No profile found",
        error: "No profile found",
      };
      res.status(404).json(response);
      return;
    }

    const response: RespGetProfileSchemaType = {
      success: true,
      data: profile,
      message: "News found successfully",
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

export const profileHandler: IHandler = {
  handler: profile,
  path: BASE_PATH.USER + "/self",
  method: REST_METHOD.GET,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  request: {},
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespGetProfileSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: RespGetProfileSchema,
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: RespGetProfileSchema,
        },
      },
    },
  },
};
