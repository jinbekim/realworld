import { QueryClient, useMutation } from "@tanstack/vue-query";
import { articleKeys, type Article, articleFromDto } from '@/entities/article';
import { articleApi } from "@/shared/api";

type UpdateArticleProps = {
  slug: UniqueId,
  article: Article,
}

export const useUpdateArticleMutation = () => useMutation({
  mutationKey: articleKeys.mutation.update(),
  mutationFn: async ({ slug, article }: UpdateArticleProps) => {
    const response = await articleApi.updateArticle(slug,
      article,
    );

    return articleFromDto(response);
  },
})


