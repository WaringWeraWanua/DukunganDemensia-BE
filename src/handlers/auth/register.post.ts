import { Request, Response } from "express";
import { userUsecase } from "../../usecases";
import {
  ReqRegisterSchema,
  RespRegisterSchema,
  RespRegisterSchemaType,
} from "../../contracts";
import { IHandler } from "../types";
import { ENDPOINTS } from "../endpoints";
import { REST_METHOD } from "../../constants";

export const register = async (req: Request, res: Response) => {
  const parsed = ReqRegisterSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespRegisterSchemaType = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const user = await userUsecase.register(parsed.data);
  const response: RespRegisterSchemaType = {
    success: true,
    data: user,
    message: "User created successfully",
  };
  res.json(response);
};

export const registerHandler: IHandler = {
  path: ENDPOINTS.AUTH.REGISTER.path,
  method: REST_METHOD.POST,
  handler: register,
  middlewares: [],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReqRegisterSchema,
        },
      },
      required: true,
      description: "Register request body",
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: RespRegisterSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: RespRegisterSchema,
        },
      },
    },
  },
};
