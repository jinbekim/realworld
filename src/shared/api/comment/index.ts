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

export const addComment = async (slug: Name, newComment: NewCommentDto, options: RequestInit = {}): Promise<CommentDto> => {
  const response = await fetcher(`articles/${slug}/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment: newComment }),
    ...options
  });
  return response.comment;
}

export const deleteComment = async (slug: Name, id: number, options: RequestInit = {}): Promise<void> => {
  await fetcher(`articles/${slug}/comments/${id}`, {
    method: 'DELETE',
    ...options
  });
}

export const getComments = async (slug: Name, options: RequestInit = {}): Promise<CommentDto[]> => {
  const response = await fetcher(`articles/${slug}/comments`, {
    method: 'GET',
    ...options
  });
  return response.comments;
}
