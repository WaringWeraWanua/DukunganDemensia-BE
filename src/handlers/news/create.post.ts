import { Request, Response } from "express";
import { newsUsecase } from "../../usecases";
import { CreateNewsSchema } from "../../contracts";
import { CreateNewsResponse } from "../../contracts";

export const create = async (req: Request, res: Response) => {
  const parsed = CreateNewsSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: CreateNewsResponse = {
      success: false,
      message: "Invalid request body",
      error: parsed.error.message,
    };

    res.status(400).json(response);
    return;
  }

  const news = await newsUsecase.create(parsed.data);
  const response: CreateNewsResponse = {
    success: true,
    data: news,
    message: "News created successfully",
  };

  res.json(response);
};
