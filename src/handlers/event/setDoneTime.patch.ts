import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import {
  ReqSetDoneTimeSchema,
  RespSetDoneTimeSchema,
  RespSetDoneTimeSchemaType,
} from "../../contracts";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { zoa } from "../../utils";

export const setDoneTime = async (req: Request, res: Response) => {
  try {
    const user: IUserMiddleware | undefined = req.body.user;
    if (!user || user.role !== Role.CARE_GIVER) {
      const response: RespSetDoneTimeSchemaType = {
        success: false,
        message: "Please authenticate as patient",
        error: "Please authenticate as patient",
      };
      res.status(401).json(response);
      return;
    }

    const eventId = req.params.id;

    const parsed = ReqSetDoneTimeSchema.safeParse(req.body);
    if (!parsed.success) {
      const response: RespSetDoneTimeSchemaType = {
        success: false,
        message: "Invalid request body",
        error: parsed.error.message,
      };
      res.status(400).json(response);
      return;
    }

    const updated = await eventUsecase.updateDoneTime({
      careGiverId: user.id,
      eventId,
      doneTime: new Date(parsed.data.doneTime),
    });
    if (!updated) {
      const response: RespSetDoneTimeSchemaType = {
        success: false,
        message: "Failed to update done time",
        error: "Failed to update done time",
      };
      res.status(404).json(response);
      return;
    }

    const response: RespSetDoneTimeSchemaType = {
      success: true,
      data: updated,
      message: "Done time updated successfully",
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

export const setDoneTimeHandler: IHandler = {
  path: BASE_PATH.EVENT + "/:id/doneTime",
  method: REST_METHOD.PATCH,
  handler: setDoneTime,
  middlewares: [
    MAP_MIDDLEWARES.NEED_LOGIN,
    MAP_MIDDLEWARES.ROLE(Role.CARE_GIVER),
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqSetDoneTimeSchema,
        },
      },
      required: true,
      description: "Request body for updating done time",
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
          schema: RespSetDoneTimeSchema,
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: RespSetDoneTimeSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: RespSetDoneTimeSchema,
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: RespSetDoneTimeSchema,
        },
      },
    },
  },
};
