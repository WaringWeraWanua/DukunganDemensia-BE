import { NewsModel, OptionalNewsModel } from "../models";
import { INewsRepo, newsRepo } from "../repo";

export class NewsUsecase {
  private newsRepo: INewsRepo = newsRepo;

  async create(data: OptionalNewsModel) {
    return await this.newsRepo.create(data);
  }

  async update(data: OptionalNewsModel) {
    return await this.newsRepo.update(data);
  }

  async delete(id: string) {
    return await this.newsRepo.delete(id);
  }

  async findMany() {
    return await this.newsRepo.findMany();
  }

  async findOne(id: string) {
    return await this.newsRepo.findOne(id);
  }
}

export type INewsUsecase = {
  create: (data: OptionalNewsModel) => Promise<NewsModel>;
  update: (data: OptionalNewsModel) => Promise<NewsModel>;
  delete: (id: string) => Promise<NewsModel>;
  findMany: () => Promise<NewsModel[]>;
  findOne: (id: string) => Promise<NewsModel | null>;
};

export const newsUsecase: INewsUsecase = new NewsUsecase();
