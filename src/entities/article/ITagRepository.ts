
export interface ITagRepository {
  getAll(): Promise<Tag[] | GenericError>;
}
