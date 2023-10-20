import { type Article, articleFromDto, articleKeys } from '@/entities/article';
import { articleApi } from '@/shared/api';
import type { NewArticleDto } from '@/shared/api/article';
import { useMutation } from '@tanstack/vue-query';

export const useCreateArticle = () =>
  useMutation<Article, string, NewArticleDto>({
    mutationKey: articleKeys.mutation.create(),
    mutationFn: async (dto: NewArticleDto) => {
      const res = await articleApi.createArticle(dto);
      return articleFromDto(res);
    },
  });
