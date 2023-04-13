export interface IFavoriteRepository {
  add(slug: string): Promise<void | GenericError>;
  remove(slug: string): Promise<void | GenericError>;
}
