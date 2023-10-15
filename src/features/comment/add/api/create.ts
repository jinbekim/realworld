import { QueryClient, useMutation } from '@tanstack/vue-query';
import { commentApi } from '@/shared/api';
import { commentFromDto, commentKeys } from '@/entities/comment';
import type { NewCommentDto } from '@/shared/api/comment';

export const useCreateCommentMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async ({
      slug,
      newComment,
    }: {
      slug: string;
      newComment: NewCommentDto;
    }) => {
      const res = await commentApi.addComment(slug, {
        body: newComment.body,
      });
      return commentFromDto(res);
    },
    onMutate: async ({ slug }) => {
      const queryKey = commentKeys.comment.slug(slug);

      await queryClient.cancelQueries({ queryKey });

      return { queryKey };
    },
    onSettled: (_data, _error, _valiables, context) => {
      if (!context) return;
      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
