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

  async upsert(data: OptionalLocationModel) {
    return await this.prisma.location.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }

  async findFirst(params: { patientId?: string }) {
    return await this.prisma.location.findFirst({
      where: {
        patientId: params.patientId,
      },
    });
  }
}

export type ILocationRepo = Repo<LocationModel> & {
  findFirst(params: { patientId?: string }): Promise<LocationModel | null>;
};

export const locationRepo: ILocationRepo = new LocationRepo();
