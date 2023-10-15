import { QueryClient, useMutation } from '@tanstack/vue-query';
import { commentApi } from '@/shared/api';
import { commentKeys } from '@/entities/comment';

export const useDeleteCommentMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async ({ slug, id }: { slug: string; id: number }) => {
      const res = await commentApi.deleteComment(slug, id);
      return res;
    },
    onMutate: async ({ slug, id }) => {
      const queryKey = commentKeys.comment.slug(slug);

      await queryClient.cancelQueries({ queryKey });

      return { queryKey };
    },
    onSettled: (_data, _error, _valiables, context) => {
      if (!context) return;
      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
