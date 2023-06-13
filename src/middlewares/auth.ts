import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../configs";
import { Role } from "@prisma/client";

export interface IUserMiddleware {
  id: string;
  username: string;
  role: Role;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Please authenticate");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, CONFIG.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.body.user = user;
    console.log("user", user);
    next();
  });
};
