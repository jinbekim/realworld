import { useMutation } from '@tanstack/vue-query';
import { articleKeys, type Article, articleFromDto } from '@/entities/article';
import { articleApi } from '@/shared/api';
import type { UpdateArticleDto } from '@/shared/api/article';

type UpdateArticleProps = {
  slug: UniqueId;
  article: UpdateArticleDto;
};

export const useUpdateArticleMutation = () =>
  useMutation<Article, string, UpdateArticleProps>({
    mutationKey: articleKeys.mutation.update(),
    mutationFn: async ({ slug, article }: UpdateArticleProps) => {
      const response = await articleApi.updateArticle(slug, article);

      return articleFromDto(response);
    },
  });
