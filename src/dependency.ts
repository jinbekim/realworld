import type { IArticleRepository } from './entities/article/IArticleRepository';
import type { IFavoriteRepository } from './entities/article/IFavoriteRepository';
import type { ITagRepository } from './entities/article/ITagRepository';
import type { ICommentRepository } from './entities/comment/ICommentRepository';
import type { IProfileRepository } from './entities/profile/IProfileRepository';
import type { IUserRepository } from './entities/user/IUserRepository';
import { ArticleRepository } from './infrastructure/articleRepository';
import { CommentRepository } from './infrastructure/commentReposiroty';
import { FavoriteRepository } from './infrastructure/favoriteRepository';
import { ProfileRepository } from './infrastructure/profileRepository';
import { TagRepository } from './infrastructure/tagRepository';
import { UserRepository } from './infrastructure/userRepository';

type RepoValues = {
  IUserRepository: IUserRepository;
  ITagRepository: ITagRepository;
  IProfileRepository: IProfileRepository;
  IFavoriteRepository: IFavoriteRepository;
  ICommentRepository: ICommentRepository;
  IArticleRepository: IArticleRepository;
};

type RepoKey = keyof RepoValues;

export class Get {
  static map = new Map<RepoKey, RepoValues[RepoKey]>([
    ['IUserRepository', new UserRepository()],
    ['ITagRepository', new TagRepository()],
    ['IProfileRepository', new ProfileRepository()],
    ['IFavoriteRepository', new FavoriteRepository()],
    ['ICommentRepository', new CommentRepository()],
    ['IArticleRepository', new ArticleRepository()],
  ]);

  static get<T extends RepoKey>(key: T): RepoValues[T] {
    return this.map.get(key) as RepoValues[T];
  }

  static set<T extends RepoKey>(key: T, value: RepoValues[T]) {
    this.map.set(key, value);
  }
}
