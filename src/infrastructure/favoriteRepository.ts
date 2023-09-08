import type { Article } from '@/entities/article/Article';
import type { IFavoriteRepository } from '@/entities/article/IFavoriteRepository';
import { fetcher } from '@/shared/api/fetcher';
import { RealWorldStorage } from './storage';

export class FavoriteRepository implements IFavoriteRepository {
  async add(slug: string): Promise<Article | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/favorite`, {
        method: 'POST',
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
  async remove(slug: string): Promise<Article | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/favorite`, {
        method: 'DELETE',
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
}
