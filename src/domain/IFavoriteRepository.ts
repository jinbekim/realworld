export interface IFavoriteRepository {
  add(slug: string): Promise<void>;
  remove(slug: string): Promise<void>;
}
