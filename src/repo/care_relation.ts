import { prisma } from "../services";
import type { CareRelationModel, OptionalCareRelationModel } from "../models";
import type { Repo } from "./base";

export class CareRelationRepo {
  private prisma = prisma;

  async create(data: OptionalCareRelationModel) {
    return await this.prisma.careRelation.create({
      data,
    });
  }

  async findMany() {
    return await this.prisma.careRelation.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.careRelation.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: OptionalCareRelationModel) {
    return await this.prisma.careRelation.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.careRelation.delete({
      where: {
        id,
      },
    });
  }
}

export type ICareRelationRepo = Repo<CareRelationModel>;

export const careRelationRepo: ICareRelationRepo = new CareRelationRepo();