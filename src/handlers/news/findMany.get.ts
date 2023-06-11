import { newsUsecase } from "../../usecases";
import { Request, Response } from "express";
import { FindManyNewsResponse } from "../../contracts";

export const findMany = async (req: Request, res: Response) => {
  const news = await newsUsecase.findMany();
  const response: FindManyNewsResponse = {
    success: true,
    data: news,
    message: "News found successfully",
  };

  res.json(response);
}
