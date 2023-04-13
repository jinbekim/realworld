import { ArticleRepository } from "./infrastructure/articleRepository";
import { CommentRepository } from "./infrastructure/commentReposiroty";
import { FavoriteRepository } from "./infrastructure/favoriteRepository";
import { ProfileRepository } from "./infrastructure/profileRepository";
import { TagRepository } from "./infrastructure/tagRepository";
import { UserRepository } from "./infrastructure/userRepository";

export class Get {
  static map = new Map<string, any>([
    ["IUserRepository", new UserRepository()],
    ["ITagRepository", new TagRepository()],
    ["IProfileRepository", new ProfileRepository()],
    ["IFavoriteRepository", new FavoriteRepository()],
    ["ICommentRepository", new CommentRepository()],
    ["IArticleRepository", new ArticleRepository()],
  ]);

  static get<T>(key: string): T {
    return this.map.get(key);
  }
  static set<T>(key: string, value: T) {
    this.map.set(key, value);
  }
}
