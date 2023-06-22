import { Request, Response } from "express";
import { eventUsecase, careRelationUsecase } from "../../usecases";
import {
  ReqSetImageUrlSchema,
  RespSetImageUrlSchema,
  RespSetImageUrlSchemaType,
} from "../../contracts";
import { IUserMiddleware, MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { zoa } from "../../utils";

export const setImageUrl = async (req: Request, res: Response) => {
  try {
    const user: IUserMiddleware | undefined = req.body.user;
    if (!user || user.role !== Role.PATIENT) {
      const response: RespSetImageUrlSchemaType = {
        success: false,
        message: "Please authenticate as patient",
        error: "Please authenticate as patient",
      };
      res.status(401).json(response);
      return;
    }

    const eventId = req.params.id;

    const parsed = ReqSetImageUrlSchema.safeParse(req.body);
    if (!parsed.success) {
      const response: RespSetImageUrlSchemaType = {
        success: false,
        message: "Invalid request body",
        error: parsed.error.message,
      };
      res.status(400).json(response);
      return;
    }

    const updated = await eventUsecase.updateImageUrl({
      patientId: user.id,
      eventId,
      imageUrl: parsed.data.imageUrl,
    });
    if (!updated) {
      const response: RespSetImageUrlSchemaType = {
        success: false,
        message: "Failed to update image url",
        error: "Failed to update image url",
      };
      res.status(404).json(response);
      return;
    }

    const response: RespSetImageUrlSchemaType = {
      success: true,
      data: updated,
      message: "Image url updated successfully",
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

export const setImageUrlHandler: IHandler = {
  path: BASE_PATH.EVENT + "/:id/proofImageUrl",
  method: REST_METHOD.PATCH,
  handler: setImageUrl,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN, MAP_MIDDLEWARES.ROLE(Role.PATIENT)],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqSetImageUrlSchema,
        },
      },
      required: true,
      description: "Request body for set image url",
    },
    params: zoa.object({
      id: zoa.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Image url updated successfully",
      content: {
        "application/json": {
          schema: RespSetImageUrlSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
      content: {
        "application/json": {
          schema: RespSetImageUrlSchema,
        },
      },
    },
    401: {
      description: "Please authenticate as patient",
      content: {
        "application/json": {
          schema: RespSetImageUrlSchema,
        },
      },
    },
    404: {
      description: "Failed to update image url",
      content: {
        "application/json": {
          schema: RespSetImageUrlSchema,
        },
      },
    },
  },
};
