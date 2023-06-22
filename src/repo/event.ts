import { prisma } from "../services";
import type { OptionalEventModel, EventModel } from "../models";
import type { Repo } from "./base";

export class EventRepo {
  private prisma = prisma;

  async create(data: OptionalEventModel) {
    return await this.prisma.event.create({
      data,
    });
  }

  async findMany() {
    return await this.prisma.event.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyFilter(params: {
    careRelationId?: string;
    limitStartTime?: Date;
  }) {
    return await this.prisma.event.findMany({
      where: {
        careRelationId: params.careRelationId,
        startTime: {
          gte: params.limitStartTime,
        },
      },
    });
  }

  async update(data: OptionalEventModel) {
    return await this.prisma.event.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.event.delete({
      where: {
        id,
      },
    });
  }

  async upsert(data: OptionalEventModel) {
    return await this.prisma.event.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }
}

export type IEventRepo = Repo<EventModel> & {
  findManyFilter(params: {
    careRelationId?: string;
    limitStartTime?: Date;
  }): Promise<EventModel[]>;
};

export const eventRepo: IEventRepo = new EventRepo();
