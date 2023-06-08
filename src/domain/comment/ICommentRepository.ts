import type { IComment, NewComment } from "./Comment";

export interface ICommentRepository {
  add(slug: string, comment: NewComment): Promise<IComment | GenericError>;
  delete(slug: string, id: number): Promise<void | GenericError>;
  get(slug: string): Promise<IComment[] | GenericError>;
}
