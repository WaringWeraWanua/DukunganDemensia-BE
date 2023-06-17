import { UserModel, OptionalUserModel, OptionalNonIdUserModel } from "../models";
import {
  IUserRepo,
  userRepo,
  ICareRelationRepo,
  careRelationRepo,
} from "../repo";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { CONFIG } from "../configs";
import { hash, verifyHash } from "../utils";
import { IUserMiddleware } from "../middlewares";

export class UserUsecase {
  private userRepo: IUserRepo = userRepo;
  private careRelationRepo: ICareRelationRepo = careRelationRepo;

  async create(data: OptionalUserModel) {
    return await this.userRepo.create(data);
  }

  async update(data: OptionalNonIdUserModel) {
    return await this.userRepo.update(data);
  }

  async delete(id: string) {
    return await this.userRepo.delete(id);
  }

  async findMany() {
    return await this.userRepo.findMany();
  }

  async findOne(id: string) {
    return await this.userRepo.findOne(id);
  }

  async register(params: IRegisterParams) {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      role,
      careGiverUsername,
    } = params;

    if (!careGiverUsername && role === Role.PATIENT) {
      throw new Error("CareGiverId is required for patient");
    }

    const { hashed } = await hash(password);

    const user = await this.userRepo.create({
      username,
      password: hashed,
      name,
      email,
      phoneNumber,
      role,
    });

    if (careGiverUsername) {
      const careGiver = await this.userRepo.findByUsername(careGiverUsername);

      if (!careGiver) {
        throw new Error("CareGiver not found");
      }

      await this.careRelationRepo.create({
        careGiverId: careGiver.id,
        patientId: user.id,
      });
    }

    return user;
  }

  async login(params: ILoginParams) {
    const { username, password } = params;

    const user = await this.userRepo.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await verifyHash(password, user.password);

    if (!isMatch) {
      throw new Error("Password not match");
    }

    const contentToken: IUserMiddleware = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(contentToken, CONFIG.SECRET_KEY);

    return {
      user,
      token,
    };
  }
}

export type ILoginParams = {
  username: string;
  password: string;
};

export type IRegisterParams = {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: Role;
  careGiverUsername?: string;
};

export type IUserUsecase = {
  create: (data: OptionalUserModel) => Promise<UserModel>;
  update: (data: OptionalNonIdUserModel) => Promise<UserModel>;
  delete: (id: string) => Promise<UserModel>;
  findMany: () => Promise<UserModel[]>;
  findOne: (id: string) => Promise<UserModel | null>;
  login: (params: ILoginParams) => Promise<{ user: UserModel; token: string }>;
  register: (params: IRegisterParams) => Promise<UserModel>;
};

export const userUsecase: IUserUsecase = new UserUsecase();
