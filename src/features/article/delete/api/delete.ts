import { useMutation } from "@tanstack/vue-query";
import { articleKeys } from '@/entities/article';
import { articleApi } from "@/shared/api";

export const useDeleteArticleMutation = () => useMutation({
  mutationKey: articleKeys.mutation.delete(),
  mutationFn: async (slug: UniqueId) => {
    await articleApi.deleteArticle(slug);
  }
})
