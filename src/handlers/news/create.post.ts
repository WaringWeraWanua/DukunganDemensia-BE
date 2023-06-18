import { Request, Response } from "express";
import { newsUsecase } from "../../usecases";
import {
  ReqCreateNewsSchema,
  RespCreateNewsSchemaType,
  RespCreateNewsSchema,
} from "../../contracts";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";
import { Role } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  const parsed = ReqCreateNewsSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespCreateNewsSchemaType = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const news = await newsUsecase.create(parsed.data);
  if (!news) {
    const response: RespCreateNewsSchemaType = {
      success: false,
      message: "News not created",
    };

    res.status(400).json(response);
    return;
  }

  const response: RespCreateNewsSchemaType = {
    success: true,
    data: news,
    message: "News created successfully",
  };

  res.json(response);
};

export const createNewsHandler: IHandler = {
  path: BASE_PATH.NEWS,
  method: REST_METHOD.POST,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN, MAP_MIDDLEWARES.ROLE(Role.ADMIN)],
  handler: create,
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqCreateNewsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespCreateNewsSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: RespCreateNewsSchema,
        },
      },
    },
  },
};
