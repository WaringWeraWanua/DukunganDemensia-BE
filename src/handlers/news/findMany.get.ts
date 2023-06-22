import { newsUsecase } from "../../usecases";
import { Request, Response } from "express";
import {
  RespFindManyNewsSchema,
  RespFindManyNewsSchemaType,
} from "../../contracts";
import { IHandler } from "../types";
import { BASE_PATH, REST_METHOD } from "../../constants";
import { MAP_MIDDLEWARES } from "../../middlewares";

export const findMany = async (_: Request, res: Response) => {
  try {
    const news = await newsUsecase.findMany();
    const response: RespFindManyNewsSchemaType = {
      success: true,
      data: news,
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

export const findManyHandler: IHandler = {
  path: BASE_PATH.NEWS,
  method: REST_METHOD.GET,
  handler: findMany,
  middlewares: [MAP_MIDDLEWARES.NEED_LOGIN],
  request: {},
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespFindManyNewsSchema,
        },
      },
    },
  },
};
