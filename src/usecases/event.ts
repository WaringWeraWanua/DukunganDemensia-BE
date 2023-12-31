import {
  EventModel,
  OptionalEventModel,
  OptionalNonIdEventModel,
} from "../models";
import {
  ICareRelationRepo,
  IEventRepo,
  eventRepo,
  careRelationRepo,
} from "../repo";

export class EventUsecase {
  private eventRepo: IEventRepo;
  private careRelationRepo: ICareRelationRepo;

  constructor({
    eventRepo,
    careRelationRepo,
  }: {
    eventRepo: IEventRepo;
    careRelationRepo: ICareRelationRepo;
  }) {
    this.eventRepo = eventRepo;
    this.careRelationRepo = careRelationRepo;
  }

  async create(data: OptionalEventModel) {
    return await this.eventRepo.create(data);
  }

  async update(data: OptionalNonIdEventModel) {
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

  async findManyFilter(params: {
    careRelationId?: string;
    limitStartTime?: Date;
  }) {
    return await this.eventRepo.findManyFilter(params);
  }

  async updateImageUrl(params: {
    patientId: string;
    imageUrl: string;
    eventId: string;
  }) {
    const event = await this.findOne(params.eventId);
    if (!event) {
      return null;
    }

    const careRelation = await this.careRelationRepo.findByPatientId(
      params.patientId
    );
    if (!careRelation || careRelation.patientId !== params.patientId) {
      return null;
    }

    event.proofImageUrl = params.imageUrl;
    return await this.update(event);
  }

  async setDone(params: { careGiverId: string; eventId: string }) {
    const event = await this.findOne(params.eventId);
    if (!event) {
      return null;
    }

    const careRelation = await this.careRelationRepo.findByCareGiverId(
      params.careGiverId
    );
    if (!careRelation || careRelation.careGiverId !== params.careGiverId) {
      return null;
    }

    event.doneTime = new Date();
    return await this.update(event);
  }
}

export type IEventUsecase = {
  create: (data: OptionalEventModel) => Promise<EventModel>;
  update: (data: OptionalNonIdEventModel) => Promise<EventModel>;
  delete: (id: string) => Promise<EventModel>;
  findMany: () => Promise<EventModel[]>;
  findOne: (id: string) => Promise<EventModel | null>;
  findByCareRelationId: (careRelationId: string) => Promise<EventModel[]>;
  updateImageUrl(params: {
    patientId: string;
    imageUrl: string;
    eventId: string;
  }): Promise<EventModel | null>;
  setDone(params: {
    careGiverId: string;
    eventId: string;
  }): Promise<EventModel | null>;
  findManyFilter(params: {
    careRelationId?: string;
    limitStartTime?: Date;
  }): Promise<EventModel[]>;
};

export const eventUsecase: IEventUsecase = new EventUsecase({
  eventRepo,
  careRelationRepo,
});
