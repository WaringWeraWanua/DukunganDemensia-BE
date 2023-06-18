import { Request, Response, NextFunction } from "express";
import { BaseResponseSchemaType } from "../contracts";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const response: BaseResponseSchemaType = {
    success: false,
    error: err.message,
    message: "An error occurred",
  };
  res.status(500).json(response);
};
