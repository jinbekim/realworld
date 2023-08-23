import type { IComment, NewComment } from '@/domain/Comment';
import type { ICommentRepository } from '@/domain/ICommentRepository';
import { fetcher } from './fetcher';
import { RealWorldStorage } from './storage';

export class CommentRepository implements ICommentRepository {
  async add(
    slug: string,
    comment: NewComment
  ): Promise<GenericError | IComment> {
    try {
      const response = await fetcher(`articles/${slug}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
      });
      return response.comment;
    } catch (error: any) {
      return error;
    }
  }
  async delete(slug: string, id: number): Promise<void | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/comments/${id}`, {
        method: 'DELETE',
      });
    } catch (error: any) {
      return error;
    }
  }
  async get(slug: string): Promise<GenericError | IComment[]> {
    try {
      const response = await fetcher(`articles/${slug}/comments`, {
        method: 'GET',
      });
      return response.comments;
    } catch (error: any) {
      return error;
    }
  }
}
