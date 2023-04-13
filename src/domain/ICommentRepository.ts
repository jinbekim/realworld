import type { Comment, NewComment } from "./Comment";

export interface ICommentRepository {
  add(slug: string, comment: NewComment): Promise<Comment | GenericError>;
  delete(slug: string, id: number): Promise<void | GenericError>;
  get(slug: string): Promise<Comment[] | GenericError>;
}
