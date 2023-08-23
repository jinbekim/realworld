import type {
  Article,
  Articles,
  NewArticle,
  UpdateArticle,
} from '@/domain/Article';
import type { IArticleRepository } from '@/domain/IArticleRepository';
import { fetcher } from './fetcher';
import { RealWorldStorage } from './storage';
import { addQueryParam } from '../libs/addQueryParam';

export class ArticleRepository implements IArticleRepository {
  async getFeedArticles({
    limit,
    offset,
  }: Pagination): Promise<Articles | GenericError> {
    try {
      let url = `articles/feed`;
      url = addQueryParam(url, 'limit', limit.toString());
      url = addQueryParam(url, 'offset', offset.toString());

      const response = await fetcher(url, {
        method: 'GET',
      });

      return response;
    } catch (error: any) {
      return error;
    }
  }
  async getArticles({
    tag,
    author,
    favorited,
    pagination: { limit, offset },
  }: {
    tag: string;
    author: string;
    favorited: string;
    pagination: Pagination;
  }): Promise<Articles | GenericError> {
    try {
      let url = `articles`;
      url = addQueryParam(url, 'tag', tag);
      url = addQueryParam(url, 'author', author);
      url = addQueryParam(url, 'favorited', favorited);
      url = addQueryParam(url, 'limit', limit.toString());
      url = addQueryParam(url, 'offset', offset.toString());

      const response = await fetcher(url, {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      return error;
    }
  }
  async createArticle(article: NewArticle): Promise<GenericError | Article> {
    try {
      const response = await fetcher('articles', {
        method: 'POST',

        body: JSON.stringify({ article }),
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
  async getArticle(slug: string): Promise<GenericError | Article> {
    try {
      const response = await fetcher(`articles/${slug}`, {
        method: 'GET',
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
  async updateArticle(
    slug: string,
    article: UpdateArticle
  ): Promise<GenericError | Article> {
    try {
      const response = await fetcher(`articles/${slug}`, {
        method: 'PUT',
        body: JSON.stringify({ article }),
      });
      return response.article;
    } catch (error: any) {
      return error;
    }
  }
  async deleteArticle(slug: string): Promise<GenericError | void> {
    try {
      const response = await fetcher(`articles/${slug}`, {
        method: 'DELETE',
      });
    } catch (error: any) {
      return error;
    }
  }
}
