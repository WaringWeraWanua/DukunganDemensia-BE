import { OptionalGenerated, Model, OptionalNonIdGenerated } from "../models";

export interface Repo<T extends Model> {
  create: (data: OptionalGenerated<T>) => Promise<T>;
  findMany: () => Promise<T[]>;
  findOne: (id: string) => Promise<T | null>;
  update: (data: OptionalNonIdGenerated<T>) => Promise<T>;
  delete: (id: string) => Promise<T>;
  upsert: (data: OptionalGenerated<T>) => Promise<T>;
}
