import { QueryClient, useMutation } from '@tanstack/vue-query';
import { favoriteApi } from '@/shared/api';
import { articleKeys } from '@/entities/article';
import { useFavoriteMutation } from './core';

export const useUnfavoriteArticleMutation = (queryClient: QueryClient) =>
  useFavoriteMutation(
    queryClient,
    favoriteApi.deleteArticleFavorite,
    articleKeys.mutation.unfavorites()
  );
