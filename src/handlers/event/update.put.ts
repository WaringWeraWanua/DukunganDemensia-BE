import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import {
  ReqUpdateEventSchema,
  RespUpdateEventSchema,
  RespUpdateEventSchemaType,
} from "../../contracts";
import { OptionalNonIdEventModel } from "../../models";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { zoa } from "../../utils";

export const update = async (req: Request, res: Response) => {
  try {
    const user: IUserMiddleware | undefined = req.body.user;
    if (!user || user.role !== Role.CARE_GIVER) {
      const response: RespUpdateEventSchemaType = {
        success: false,
        message: "Please authenticate",
        error: "Please authenticate",
      };
      res.status(401).json(response);
      return;
    }

    const parsed = ReqUpdateEventSchema.safeParse(req.body);

    if (!parsed.success) {
      const response: RespUpdateEventSchemaType = {
        success: false,
        message: "Invalid request body",
        error: parsed.error.message,
      };

      res.status(400).json(response);
      return;
    }

    const careRelation = await careRelationUsecase.findByUserMiddleware(user);
    if (!careRelation) {
      const response: RespUpdateEventSchemaType = {
        success: false,
        message: "No patient found",
        error: "No patient found",
      };
      res.status(404).json(response);
      return;
    }

    const dated: OptionalNonIdEventModel = {
      ...parsed.data,
      id: req.params.id,
      startTime: new Date(parsed.data.startTime),
      proofImageUrl: null,
      doneTime: null,
      careRelationId: careRelation.id,
      ringtoneType: parsed.data.ringtoneType,
    };

    const event = await eventUsecase.update(dated);
    const response: RespUpdateEventSchemaType = {
      success: true,
      data: event,
      message: "Event created successfully",
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

export const updateHandler: IHandler = {
  path: BASE_PATH.EVENT + "/:id",
  method: REST_METHOD.PUT,
  handler: update,
  middlewares: [
    MAP_MIDDLEWARES.NEED_LOGIN,
    MAP_MIDDLEWARES.ROLE(Role.CARE_GIVER),
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqUpdateEventSchema,
        },
      },
      required: true,
      description: "Update event request body",
    },
    params: zoa.object({
      id: zoa.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespUpdateEventSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
      content: {
        "application/json": {
          schema: RespUpdateEventSchema,
        },
      },
    },
    401: {
      description: "Please authenticate",
      content: {
        "application/json": {
          schema: RespUpdateEventSchema,
        },
      },
    },
    404: {
      description: "No patient found",
      content: {
        "application/json": {
          schema: RespUpdateEventSchema,
        },
      },
    },
  },
};
