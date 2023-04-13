import type { Profile } from "./Profile";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string;
  createdAt: string;
  updatedAt: string;
  favorited: string;
  favoritesCount: string;
  author: Profile;
}

export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export type UpdateArticle = RequiredAtLeastOne<Article>;
