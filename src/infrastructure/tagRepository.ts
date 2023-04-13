import type { ITagRepository } from "@/domain/ITagRepository";
import { fetcher } from "./fetcher";

export class TagRepository implements ITagRepository {
  async getAll(): Promise<string[] | GenericError> {
    try {
      const response = await fetcher(`tags`, {
        method: "POST",
      });
      return response.tags;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
}
