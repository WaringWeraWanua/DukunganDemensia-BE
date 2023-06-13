import { prisma } from "../services";
import type { OptionalNewsModel, NewsModel } from "../models";
import type { Repo } from "./base";

export class NewsRepo {
  private prisma = prisma;

  async create(data: OptionalNewsModel) {
    return await this.prisma.news.create({
      data,
    });
  }

  async findMany() {
    return await this.prisma.news.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.news.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: OptionalNewsModel) {
    return await this.prisma.news.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.news.delete({
      where: {
        id,
      },
    });
  }

  async upsert(data: OptionalNewsModel) {
    return await this.prisma.news.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }
}

export type INewsRepo = Repo<NewsModel>;

export const newsRepo: INewsRepo = new NewsRepo();
