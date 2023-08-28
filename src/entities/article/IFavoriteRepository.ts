import type { Article } from "./Article";

export interface IFavoriteRepository {
  add(slug: string): Promise<Article | GenericError>;
  remove(slug: string): Promise<Article | GenericError>;
}
