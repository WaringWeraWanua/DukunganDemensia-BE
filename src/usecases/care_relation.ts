import { IUserMiddleware } from "../middlewares";
import { CareRelationModel, OptionalCareRelationModel } from "../models";
import { ICareRelationRepo, careRelationRepo } from "../repo";

export class CareRelationUsecase {
  private careRelationRepo: ICareRelationRepo = careRelationRepo;

  async create(data: OptionalCareRelationModel) {
    return await this.careRelationRepo.create(data);
  }

  async update(data: OptionalCareRelationModel) {
    return await this.careRelationRepo.update(data);
  }

  async delete(id: string) {
    return await this.careRelationRepo.delete(id);
  }

  async findMany() {
    return await this.careRelationRepo.findMany();
  }

  async findOne(id: string) {
    return await this.careRelationRepo.findOne(id);
  }

  async findByPatientId(patientId: string) {
    return await this.careRelationRepo.findByPatientId(patientId);
  }

  async findByCareGiverId(careGiverId: string) {
    return await this.careRelationRepo.findByCareGiverId(careGiverId);
  }

  async findByUserMiddleware(userMiddleare: IUserMiddleware) {
    switch (userMiddleare.role) {
      case "PATIENT": {
        return await this.findByPatientId(userMiddleare.id);
      }
      case "CARE_GIVER": {
        return await this.findByCareGiverId(userMiddleare.id);
      }
      default: {
        return null;
      }
    }
  }
}

export type ICareRelationUsecase = {
  create: (data: OptionalCareRelationModel) => Promise<CareRelationModel>;
  update: (data: OptionalCareRelationModel) => Promise<CareRelationModel>;
  delete: (id: string) => Promise<CareRelationModel>;
  findMany: () => Promise<CareRelationModel[]>;
  findOne: (id: string) => Promise<CareRelationModel | null>;
  findByPatientId: (patientId: string) => Promise<CareRelationModel | null>;
  findByCareGiverId: (careGiverId: string) => Promise<CareRelationModel | null>;
  findByUserMiddleware(
    userMiddleare: IUserMiddleware
  ): Promise<CareRelationModel | null>;
};

export const careRelationUsecase: ICareRelationUsecase =
  new CareRelationUsecase();
