import { LocationModel, OptionalLocationModel } from "../models";
import { ILocationRepo, locationRepo } from "../repo";

export class LocationUsecase {
  private locationRepo: ILocationRepo = locationRepo;

  async create(data: OptionalLocationModel) {
    return await this.locationRepo.create(data);
  }

  async update(data: OptionalLocationModel) {
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
}

export type ILocationUsecase = {
  create: (data: OptionalLocationModel) => Promise<LocationModel>;
  update: (data: OptionalLocationModel) => Promise<LocationModel>;
  delete: (id: string) => Promise<LocationModel>;
  findMany: () => Promise<LocationModel[]>;
  findOne: (id: string) => Promise<LocationModel | null>;
};

export const locationUsecase: ILocationUsecase = new LocationUsecase();
