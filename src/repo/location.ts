import { prisma } from "../services";
import type { OptionalLocationModel, LocationModel } from "../models";
import type { Repo } from "./base";

export class LocationRepo {
  private prisma = prisma;

  async create(data: OptionalLocationModel) {
    return await this.prisma.location.create({
      data,
    });
  }

  async findMany() {
    return await this.prisma.location.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.location.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: OptionalLocationModel) {
    return await this.prisma.location.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.location.delete({
      where: {
        id,
      },
    });
  }
}

export type ILocationRepo = Repo<LocationModel>;

export const locationRepo: ILocationRepo = new LocationRepo();
