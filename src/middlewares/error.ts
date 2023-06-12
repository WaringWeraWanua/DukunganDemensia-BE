import { Request, Response, NextFunction } from "express";
import { BaseResponse } from "../contracts";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const response: BaseResponse<null> = {
    success: false,
    data: null,
    error: err.message,
    message: "An error occurred",
  };
  res.status(500).json(response);
};
