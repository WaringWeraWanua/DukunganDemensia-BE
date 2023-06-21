import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import {
  ReqCreateEventSchema,
  RespCreateEventSchema,
  RespCreateEventSchemaType,
} from "../../contracts";
import { OptionalEventModel } from "../../models";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";

export const create = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    const response: RespCreateEventSchemaType = {
      success: false,
      message: "Please authenticate",
      error: "Please authenticate",
    };
    res.status(401).json(response);
    return;
  }

  const parsed = ReqCreateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: RespCreateEventSchemaType = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const careRelation = await careRelationUsecase.findByUserMiddleware(user);
  if (!careRelation) {
    const response: RespCreateEventSchemaType = {
      success: false,
      message: "No patient found",
      error: "No patient found",
    };
    res.status(404).json(response);
    return;
  }

  const dated: OptionalEventModel = {
    ...parsed.data,
    startTime: new Date(parsed.data.startTime),
    endTime: new Date(parsed.data.endTime),
    proofImageUrl: null,
    doneTime: null,
    careRelationId: careRelation.id,
    ringtoneType: parsed.data.ringtoneType || "",
  };

  const event = await eventUsecase.create(dated);
  const response: RespCreateEventSchemaType = {
    success: true,
    data: event,
    message: "Event created successfully",
  };

  res.json(response);
};

export const createEventHandler: IHandler = {
  path: BASE_PATH.EVENT,
  method: REST_METHOD.POST,
  handler: create,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  request: {
    body: {
      description: "Create event",
      required: true,
      content: {
        "application/json": {
          schema: ReqCreateEventSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespCreateEventSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: RespCreateEventSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: RespCreateEventSchema,
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: RespCreateEventSchema,
        },
      },
    },
  },
};
