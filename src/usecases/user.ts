import { UserModel, OptionalUserModel } from "../models";
import {
  IUserRepo,
  userRepo,
  ICareRelationRepo,
  careRelationRepo,
} from "../repo";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CONFIG } from "../configs";

export class UserUsecase {
  private userRepo: IUserRepo = userRepo;
  private careRelationRepo: ICareRelationRepo = careRelationRepo;

  async create(data: OptionalUserModel) {
    return await this.userRepo.create(data);
  }

  async update(data: OptionalUserModel) {
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
    const { username, password, name, email, phoneNumber, role, careGiverId } =
      params;

    const salt = await bcrypt.genSalt(CONFIG.SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);

    const user = await this.userRepo.create({
      username,
      password: hashed,
      name,
      email,
      phoneNumber,
      role,
    });

    if (careGiverId) {
      await this.careRelationRepo.create({
        careGiverId,
        patientId: user.id,
      });
    }

    return user;
  }

  async login(params: ILoginParams) {
    const { username, password } = params;

    const user = await this.userRepo.findOne(username);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password not match");
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      CONFIG.SECRET_KEY
    );

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
  careGiverId: string | null;
};

export type IUserUsecase = {
  create: (data: OptionalUserModel) => Promise<UserModel>;
  update: (data: OptionalUserModel) => Promise<UserModel>;
  delete: (id: string) => Promise<UserModel>;
  findMany: () => Promise<UserModel[]>;
  findOne: (id: string) => Promise<UserModel | null>;
  login: (params: ILoginParams) => Promise<{ user: UserModel; token: string }>;
  register: (params: IRegisterParams) => Promise<UserModel>;
};

export const userUsecase: IUserUsecase = new UserUsecase();
