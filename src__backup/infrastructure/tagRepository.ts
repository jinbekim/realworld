import type { ITagRepository } from "@/domain/ITagRepository";
import { fetcher } from "./fetcher";
import type { Tag } from "./tag";

export class TagRepository implements ITagRepository {
  async getAll(): Promise<Tag[] | GenericError> {
    try {
      const response = await fetcher(`tags`, {
        method: "GET",
      });
      return response.tags;
    } catch (error: any) {
      return error;
    }
  }
}
