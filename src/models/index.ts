import { User, Location, CareRelation, News, Event } from "@prisma/client";
import type { Prettify, Optional } from "../utils";

export type UserModel = Prettify<User>;
export type LocationModel = Prettify<Location>;
export type CareRelationModel = Prettify<CareRelation>;
export type NewsModel = Prettify<News>;
export type EventModel = Prettify<Event>;

export type Model =
  | UserModel
  | LocationModel
  | CareRelationModel
  | NewsModel
  | EventModel;

export type OptionalFields = "id" | "createdAt" | "updatedAt";

export type OptionalGenerated<T extends Model> = Prettify<Optional<T, OptionalFields>>;
export type OptionalUserModel = OptionalGenerated<UserModel>;
export type OptionalLocationModel = OptionalGenerated<LocationModel>;
export type OptionalCareRelationModel = OptionalGenerated<CareRelationModel>;
export type OptionalNewsModel = OptionalGenerated<NewsModel>;
export type OptionalEventModel = OptionalGenerated<EventModel>;
