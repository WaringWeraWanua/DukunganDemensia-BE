import {
  LocationModel,
  OptionalLocationModel,
  OptionalNonIdLocationModel,
} from "../models";
import { ILocationRepo, locationRepo } from "../repo";

export class LocationUsecase {
  private locationRepo: ILocationRepo = locationRepo;

  async create(data: OptionalLocationModel) {
    return await this.locationRepo.create(data);
  }

  async update(data: OptionalNonIdLocationModel) {
    return await this.locationRepo.update(data);
  }

  async delete(id: string) {
    return await this.locationRepo.delete(id);
  }

  async findMany() {
    return await this.locationRepo.findMany();
  }

  async findOne(id: string) {
    return await this.locationRepo.findOne(id);
  }

  async upsert(data: OptionalLocationModel) {
    return await this.locationRepo.upsert(data);
  }

  async findPatientLocation(patientId: string) {
    return await this.locationRepo.findFirst({
      patientId,
    });
  }
}

export type ILocationUsecase = {
  create: (data: OptionalLocationModel) => Promise<LocationModel>;
  update: (data: OptionalNonIdLocationModel) => Promise<LocationModel>;
  delete: (id: string) => Promise<LocationModel>;
  findMany: () => Promise<LocationModel[]>;
  findOne: (id: string) => Promise<LocationModel | null>;
  upsert: (data: OptionalLocationModel) => Promise<LocationModel>;
  findPatientLocation: (patientId: string) => Promise<LocationModel | null>;
};

export const locationUsecase: ILocationUsecase = new LocationUsecase();
