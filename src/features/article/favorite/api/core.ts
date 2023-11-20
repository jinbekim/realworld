import { QueryClient, useMutation } from '@tanstack/vue-query';
import { articleKeys, type Article, articleFromDto } from '@/entities/article';
import {
  type ArticlesInfinityData,
  updateInfinityData,
} from '../../lib/updateInfinityData';
import type { ArticleDto } from '@/shared/api/article';

export const useFavoriteMutation = (
  queryClient: QueryClient,
  mutationCallback: (slug: string) => Promise<ArticleDto>,
  mutationKey: string[]
) =>
  useMutation({
    mutationKey,
    mutationFn: async (newArticle: Article) => {
      const article = await mutationCallback(newArticle.slug);
      return articleFromDto(article);
    },
    onMutate: async (newArticle) => {
      const articlesQueryKey = articleKeys.articles.root;
      const articleQueryKey = articleKeys.article.slug(newArticle.slug);

      await queryClient.cancelQueries({ queryKey: articlesQueryKey });
      await queryClient.cancelQueries({ queryKey: articleQueryKey });

      const prevArticle: Article = {
        ...newArticle,
        favorited: !newArticle.favorited,
        favoritesCount: newArticle.favorited
          ? newArticle.favoritesCount - 1
          : newArticle.favoritesCount + 1,
      };

      queryClient.setQueriesData<ArticlesInfinityData>(
        articlesQueryKey,
        (prevInfinityData) => {
          if (!prevInfinityData) return undefined;
          return updateInfinityData(prevInfinityData, newArticle);
        }
      );

      queryClient.setQueryData<Article>(articleQueryKey, newArticle);

      return { articlesQueryKey, articleQueryKey, prevArticle };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;

      const { articleQueryKey, articlesQueryKey, prevArticle } = context;

      queryClient.setQueryData(articleQueryKey, prevArticle);
      queryClient.setQueriesData<ArticlesInfinityData>(
        articlesQueryKey,
        (prevInfinityData) => {
          if (!prevInfinityData) return undefined;
          return updateInfinityData(prevInfinityData, prevArticle);
        }
      );
    },
    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      const { articlesQueryKey, articleQueryKey } = context;

      queryClient.invalidateQueries({ queryKey: articlesQueryKey });
      queryClient.invalidateQueries({ queryKey: articleQueryKey });
    },
  });
