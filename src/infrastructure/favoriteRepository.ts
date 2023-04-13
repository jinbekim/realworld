import type { IFavoriteRepository } from "@/domain/IFavoriteRepository";
import { fetcher } from "./fetcher";
import { RealWorldStorage } from "./storage";

export class FavoriteRepository implements IFavoriteRepository {
  async add(slug: string): Promise<void | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("user").token}`,
        },
      });
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async remove(slug: string): Promise<void | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("user").token}`,
        },
      });
      return response.article;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
}
