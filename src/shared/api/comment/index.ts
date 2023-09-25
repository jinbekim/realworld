import { fetcher } from "../fetcher";
import type { ProfileDto } from "../profile";

export interface CommentDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: ProfileDto;
}

export interface NewCommentDto {
  body: string;
}

export const addComment = async (slug: Name, newComment: NewCommentDto): Promise<CommentDto> => {
  const response = await fetcher(`articles/${slug}/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment: newComment }),
  });
  return response.comment;
}

export const deleteComment = async (slug: Name, id: number): Promise<void> => {
  await fetcher(`articles/${slug}/comments/${id}`, {
    method: 'DELETE',
  });
}

export const getComments = async (slug: Name): Promise<CommentDto[]> => {
  const response = await fetcher(`articles/${slug}/comments`, {
    method: 'GET',
  });
  return response.comments;
}
