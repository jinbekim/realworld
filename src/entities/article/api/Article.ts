import { profileFromDto, type Profile } from '@/entities/profile';
import type { Tag } from '@/entities/tag/api/tag';
import { articleApi } from '@/shared/api';
import type { ArticleDto } from '@/shared/api/article';
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

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

export type GlobalfeedQuery = {
  tag?: string;
  author?: string;
  favorited?: string;
  offset: number;
  limit: number;
};

export type UserfeedQuery = {
  offset: number;
  limit: number;
};

export const articleKeys = {
  articles: {
    root: ['articles'],
    globalfeed: {
      root: () => [...articleKeys.articles.root, 'globalfeed'],
      query: (query: GlobalfeedQuery) => [
        ...articleKeys.articles.globalfeed.root(),
        query,
      ],
    },
    userfeed: {
      root: () => [...articleKeys.articles.root, 'userfeed'],
      query: (query: UserfeedQuery) => [
        ...articleKeys.articles.userfeed.root(),
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
  };
};

// use inifinityArticles
// use infinity

export const useUserInfinityArticles = (query: Ref<UserfeedQuery>) => {
  const { offset, limit } = query.value;
  return useInfiniteQuery({
    queryKey: articleKeys.articles.userfeed.query(query.value),
    queryFn: async ({ pageParam = offset, signal }) => {
      const result = await articleApi.getFeedArticles(
        { ...query.value, offset: pageParam },
        { signal }
      );
      return result.articles.map(articleFromDto);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) return null;

      return lastPage.length ? pages.length * limit : null;
    },
  });
};

export const useArticle = (slug: UniqueId) =>
  useQuery({
    queryKey: articleKeys.article.slug(slug),
    queryFn: async ({ signal }) => {
      const response = await articleApi.getArticle(slug, {
        signal,
      });
      return articleFromDto(response);
    },
  });
