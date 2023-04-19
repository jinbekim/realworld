import type { Tag } from "@/infrastructure/tag";

export interface ITagRepository {
  getAll(): Promise<Tag[] | GenericError>;
}
