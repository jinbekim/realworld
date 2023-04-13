import type { NewComment } from "./Comment";

export interface ICommentRepository {
  add(slug: string, comment: NewComment): Promise<Comment>;
  delete(slug: string, id: number): Promise<void>;
  get(slug: string): Promise<Comment[]>;
}
