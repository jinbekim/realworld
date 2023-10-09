import { QueryClient, useMutation } from '@tanstack/vue-query';
import { favoriteApi } from '@/shared/api';
import { articleKeys } from '@/entities/article';

export const useUnfavoriteMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: articleKeys.mutation.unfavorites(),
    mutationFn: favoriteApi.deleteArticleFavorite,
    onMutate: async (slug) => {
      const articlesQueryKey = articleKeys.articles.root;
      const articleQueryKey = articleKeys.article.slug(slug);

      await queryClient.cancelQueries({ queryKey: articlesQueryKey });
      await queryClient.cancelQueries({ queryKey: articleQueryKey });

      return { articlesQueryKey, articleQueryKey };
    },

    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      const { articlesQueryKey, articleQueryKey } = context;

      queryClient.invalidateQueries({ queryKey: articlesQueryKey });
      queryClient.invalidateQueries({ queryKey: articleQueryKey });
    },
  });
