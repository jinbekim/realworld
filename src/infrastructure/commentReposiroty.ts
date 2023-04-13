import type { Comment, NewComment } from "@/domain/Comment";
import type { ICommentRepository } from "@/domain/ICommentRepository";
import { fetcher } from "./fetcher";
import { RealWorldStorage } from "./storage";

export class CommentRepository implements ICommentRepository {
  async add(
    slug: string,
    comment: NewComment
  ): Promise<GenericError | Comment> {
    try {
      const response = await fetcher(`articles/${slug}/comments`, {
        method: "GET",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.article;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async delete(slug: string, id: number): Promise<void | GenericError> {
    try {
      const response = await fetcher(`articles/${slug}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.article;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async get(slug: string): Promise<GenericError | Comment[]> {
    try {
      const response = await fetcher(`articles/${slug}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.comments;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
}
