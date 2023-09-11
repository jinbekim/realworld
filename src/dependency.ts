
import type { IFavoriteRepository } from './entities/article/IFavoriteRepository';
import type { ITagRepository } from './entities/article/ITagRepository';
import type { ICommentRepository } from './entities/comment/ICommentRepository';
import type { IProfileRepository } from './entities/profile/IProfileRepository';
import { CommentRepository } from './infrastructure/commentReposiroty';
import { FavoriteRepository } from './infrastructure/favoriteRepository';
import { ProfileRepository } from './infrastructure/profileRepository';
import { TagRepository } from './infrastructure/tagRepository';

type RepoValues = {
  ITagRepository: ITagRepository;
  IProfileRepository: IProfileRepository;
  IFavoriteRepository: IFavoriteRepository;
  ICommentRepository: ICommentRepository;
};

type RepoKey = keyof RepoValues;

export class Get {
  static map = new Map<RepoKey, RepoValues[RepoKey]>([
    ['ITagRepository', new TagRepository()],
    ['IProfileRepository', new ProfileRepository()],
    ['IFavoriteRepository', new FavoriteRepository()],
    ['ICommentRepository', new CommentRepository()],
  ]);

  static get<T extends RepoKey>(key: T): RepoValues[T] {
    return this.map.get(key) as RepoValues[T];
  }

  static set<T extends RepoKey>(key: T, value: RepoValues[T]) {
    this.map.set(key, value);
  }
}
