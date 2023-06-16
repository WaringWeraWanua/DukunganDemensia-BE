import { EventModel, OptionalEventModel } from "../models";
import { IEventRepo, eventRepo } from "../repo";

export class EventUsecase {
  private eventRepo: IEventRepo = eventRepo;

  async create(data: OptionalEventModel) {
    return await this.eventRepo.create(data);
  }

  async update(data: OptionalEventModel) {
    return await this.eventRepo.update(data);
  }

  async delete(id: string) {
    return await this.eventRepo.delete(id);
  }

  async findMany() {
    return await this.eventRepo.findMany();
  }

  async findOne(id: string) {
    return await this.eventRepo.findOne(id);
  }

  async findByCareRelationId(careRelationId: string) {
    return await this.eventRepo.findManyFilter({ careRelationId });
  }

  async updateImageUrl(params: { imageUrl: string; eventId: string }) {
    const event = await this.findOne(params.eventId);
    if (!event) {
      return null;
    }

    event.proofImageUrl = params.imageUrl;
    return await this.update(event);
  }
}

export type IEventUsecase = {
  create: (data: OptionalEventModel) => Promise<EventModel>;
  update: (data: OptionalEventModel) => Promise<EventModel>;
  delete: (id: string) => Promise<EventModel>;
  findMany: () => Promise<EventModel[]>;
  findOne: (id: string) => Promise<EventModel | null>;
  findByCareRelationId: (careRelationId: string) => Promise<EventModel[]>;
  updateImageUrl(params: {
    imageUrl: string;
    eventId: string;
  }): Promise<EventModel | null>;
};

export const eventUsecase: IEventUsecase = new EventUsecase();
