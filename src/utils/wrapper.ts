import { RequestHandler, Request, Response, NextFunction } from "express";

export const wrapper = (fn: RequestHandler) => {
  const wrapped: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  return wrapped;
};
