import { Request, Response } from "express";
import { newsUsecase } from "../../usecases";
import { ReqCreateNewsSchema, RespCreateNews } from "../../contracts";

export const create = async (req: Request, res: Response) => {
  const parsed = ReqCreateNewsSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: RespCreateNews = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const news = await newsUsecase.create(parsed.data);
  const response: RespCreateNews = {
    success: true,
    data: news,
    message: "News created successfully",
  };

  res.json(response);
};
