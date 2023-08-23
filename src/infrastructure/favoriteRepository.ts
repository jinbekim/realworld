import type { IFavoriteRepository } from '@/domain/IFavoriteRepository';
import { fetcher } from './fetcher';
import { RealWorldStorage } from './storage';
import type { Article } from '@/domain/Article';

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
