import { profileFromDto, type Profile } from '@/entities/profile';
import type { Tag } from '@/entities/tag/api/tag';
import { articleApi } from '@/shared/api';
import type { ArticleDto } from '@/shared/api/article';
import { timeFormatter } from '@/shared/utils/timeFormatter';
import {
  useInfiniteQuery,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';

export interface Article {
  slug: Name;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export type GlobalFeedQuery = {
  tag?: string;
  author?: string;
  favorited?: string;
  offset: number;
  limit: number;
};

export type UserFeedQuery = {
  offset: number;
  limit: number;
};

export const articleKeys = {
  articles: {
    root: ['articles'],
    globalFeed: {
      root: () => [...articleKeys.articles.root, 'globalFeed'],
      query: (query: GlobalFeedQuery) => [
        ...articleKeys.articles.globalFeed.root(),
        query,
      ],
    },
    userFeed: {
      root: () => [...articleKeys.articles.root, 'userFeed'],
      query: (query: UserFeedQuery) => [
        ...articleKeys.articles.userFeed.root(),
        query,
      ],
    },
  },
  article: {
    root: ['article'],
    slug: (slug: UniqueId) => [...articleKeys.article.root, slug],
  },
  mutation: {
    create: () => [...articleKeys.article.root, 'create'],
    update: () => [...articleKeys.article.root, 'update'],
    delete: () => [...articleKeys.article.root, 'delete'],
    favorites: () => [...articleKeys.article.root, 'favorites'],
    unfavorites: () => [...articleKeys.article.root, 'unfavorites'],
  },
};

export const articleFromDto = (dto: ArticleDto): Article => {
  const { author, ...article } = dto;
  return {
    ...article,
    author: profileFromDto(author),
    createdAt: timeFormatter(article.createdAt),
  };
};

export const useUserInfinityArticles = (query: UserFeedQuery) => {
  const { offset, limit } = query;
  return useInfiniteQuery({
    queryKey: computed(() => articleKeys.articles.userFeed.query(query)),
    queryFn: async ({ pageParam = offset, signal }) => {
      const result = await articleApi.getFeedArticles(
        { ...query, offset: pageParam },
        { signal }
      );
      return {
        articles: result.articles.map(articleFromDto),
        count: result.articlesCount,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.articles.length < limit) return null;

      return lastPage.articles.length ? pages.length * limit : null;
    },
  });
};

export const useGlobalInfinityArticles = (query: GlobalFeedQuery) => {
  const { offset, limit } = query;

  return useInfiniteQuery({
    queryKey: computed(() => articleKeys.articles.globalFeed.query(query)),
    queryFn: async ({ pageParam = offset, signal }) => {
      const result = await articleApi.getArticles(
        {
          ...query,
          offset: pageParam,
        },
        { signal }
      );
      return {
        articles: result.articles.map(articleFromDto),
        count: result.articlesCount,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.articles.length < limit) return null;

      return lastPage.articles.length ? pages.length * limit : null;
    },
  });
};

export const useArticle = (
  slug: UniqueId,
  options?: UseQueryOptions<Article>
) =>
  useQuery({
    queryKey: articleKeys.article.slug(slug),
    queryFn: async ({ signal }) => {
      const response = await articleApi.getArticle(slug, {
        signal,
      });
      return articleFromDto(response);
    },
    ...options,
  });
