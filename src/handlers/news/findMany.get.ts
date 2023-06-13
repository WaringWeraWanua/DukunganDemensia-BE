import { newsUsecase } from "../../usecases";
import { Request, Response } from "express";
import { RespFindManyNews } from "../../contracts";

export const findMany = async (_: Request, res: Response) => {
  const news = await newsUsecase.findMany();
  const response: RespFindManyNews = {
    success: true,
    data: news,
    message: "News found successfully",
  };

  res.json(response);
}
