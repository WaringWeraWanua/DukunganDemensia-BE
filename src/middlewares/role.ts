import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { IUserMiddleware } from "../middlewares";

export const genRoleMiddleware = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: IUserMiddleware | null = req.body.user;
    if (!user) {
      res.status(401).send("Please authenticate");
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).send("Permission denied");
      return;
    }

    next();
  };
}
