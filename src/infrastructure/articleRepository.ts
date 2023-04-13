import type {
  Article,
  Articles,
  NewArticle,
  UpdateArticle,
} from "@/domain/Article";
import type { IArticleRepository } from "@/domain/IArticleRepository";
import { fetcher } from "./fetcher";
import { RealWorldStorage } from "./storage";

export class ArticleRepository implements IArticleRepository {
  async getFeedArticles({
    limit,
    offset,
  }: Pagination): Promise<Articles | GenericError> {
    try {
      let url = `/articles/feed?`;
      url += limit && `limit=${limit}&`;
      url += offset && `offset=${offset}`;

      const response = await fetcher(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });

      return response;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
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
      let url = `/articles/?`;
      url += tag && `tag=${tag}&`;
      url += author && `author=${author}&`;
      url += favorited && `favorited=${favorited}&`;
      url += limit && `limit=${limit}&`;
      url += offset && `offset=${offset}`;

      const response = await fetcher(url, {
        method: "GET",
      });

      return response;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async createArticle(article: NewArticle): Promise<GenericError | Article> {
    try {
      const response = await fetcher("articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
        body: JSON.stringify({ article }),
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
  async getArticle(slug: string): Promise<GenericError | Article> {
    try {
      const response = await fetcher(`articles/${slug}`, {
        method: "GET",
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
  async updateArticle(
    slug: string,
    article: UpdateArticle
  ): Promise<GenericError | Article> {
    try {
      const response = await fetcher(`articles/${slug}`, {
        method: "POST",
        body: JSON.stringify({ article }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
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
  async deleteArticle(slug: string): Promise<GenericError | void> {
    try {
      const response = await fetcher(`articles/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
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
}
