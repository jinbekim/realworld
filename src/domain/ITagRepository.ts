export interface ITagRepository {
  getAll(): Promise<string[]>;
}
