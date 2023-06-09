import type { IFavoriteRepository } from "@/domain/IFavoriteRepository";
import { fetcher } from "./fetcher";
import { RealWorldStorage } from "./storage";
import type { Article } from "@/domain/Article";

export class FavoriteRepository implements IFavoriteRepository {
  async add(slug: string): Promise<Article | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: RealWorldStorage.get("user")?.token
            ? `Token ${RealWorldStorage.get("user").token}`
            : "",
        },
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
  async remove(slug: string): Promise<Article | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: RealWorldStorage.get("user")?.token
            ? `Token ${RealWorldStorage.get("user").token}`
            : "",
        },
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
}
