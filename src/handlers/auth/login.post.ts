import { Request, Response } from "express";
import { userUsecase } from "../../usecases";
import {
  RespLoginSchemaType,
  RespLoginSchema,
  ReqLoginSchema,
} from "../../contracts";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { REST_METHOD } from "../../constants";

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = ReqLoginSchema.safeParse(req.body);

    if (!parsed.success) {
      const response: RespLoginSchemaType = {
        success: false,
        message: "Invalid request body",
        error: parsed.error.message,
      };

      res.status(400).json(response);
      return;
    }

    const result = await userUsecase.login(parsed.data);

    const response: RespLoginSchemaType = {
      success: true,
      data: result,
      message: "Login successfully",
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

export const loginHandler: IHandler = {
  path: ENDPOINTS.AUTH.LOGIN.path,
  method: REST_METHOD.POST,
  handler: login,
  middlewares: [],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqLoginSchema,
        },
      },
      required: true,
      description: "Login request body",
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespLoginSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: RespLoginSchema,
        },
      },
    },
  },
};
