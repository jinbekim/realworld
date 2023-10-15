import { profileFromDto, type Profile } from '@/entities/profile';
import { commentApi } from '@/shared/api';
import type { CommentDto } from '@/shared/api/comment';
import { useQuery } from '@tanstack/vue-query';

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export const commentKeys = {
  comment: {
    root: ['comment'],
    slug: (slug: Name) => [...commentKeys.comment.root, slug],
  },
};

export const commentFromDto = (comment: CommentDto): Comment => {
  return {
    id: comment.id,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    body: comment.body,
    author: profileFromDto(comment.author),
  };
};

export const useComment = (slug: Name) => {
  return useQuery({
    queryKey: commentKeys.comment.slug(slug),
    queryFn: async ({ signal }) => {
      const response = await commentApi.getComments(slug, {
        signal,
      });
      return response.map(commentFromDto);
    },
  });
};
