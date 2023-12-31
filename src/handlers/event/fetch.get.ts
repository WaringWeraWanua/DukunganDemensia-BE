import { Request, Response } from "express";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import {
  RespFetchEventSchema,
  RespFetchEventSchemaType,
} from "../../contracts/event";
import { careRelationUsecase, eventUsecase } from "../../usecases";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { IHandler } from "../types";

const LIMIT_TIME = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
};

export const fetch = async (req: Request, res: Response) => {
  try {
    const user: IUserMiddleware | undefined = req.body.user;
    if (!user) {
      const response: RespFetchEventSchemaType = {
        success: false,
        message: "Please authenticate",
        error: "Please authenticate",
      };
      res.status(401).json(response);
      return;
    }

    const careRelation = await careRelationUsecase.findByUserMiddleware(user);
    if (!careRelation) {
      const response: RespFetchEventSchemaType = {
        success: false,
        message: "No patient found",
        error: "No patient found",
      };
      res.status(404).json(response);
      return;
    }

    const events = await eventUsecase.findManyFilter({
      careRelationId: careRelation.id,
      limitStartTime: LIMIT_TIME(),
    });

    // sort by nearest start time
    events.sort((a, b) => {
      return a.startTime.getTime() - b.startTime.getTime();
    });

    const response: RespFetchEventSchemaType = {
      success: true,
      data: {
        events,
        careGiverId: careRelation.id,
        patientId: careRelation.patientId,
      },
      message: "Get events successfully",
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

export const fetchEventHandler: IHandler = {
  path: BASE_PATH.EVENT,
  method: REST_METHOD.GET,
  handler: fetch,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  request: {},
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespFetchEventSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: RespFetchEventSchema,
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: RespFetchEventSchema,
        },
      },
    },
  },
};
