import { prisma } from "../services";
import type { UserModel, OptionalUserModel } from "../models";
import type { Repo } from "./base";

export class UserRepo {
  private prisma = prisma;

  async create(user: OptionalUserModel) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async findMany() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(user: OptionalUserModel) {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export type IUserRepo = Repo<UserModel>;

export const userRepo: IUserRepo = new UserRepo();
