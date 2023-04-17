import type { Profile } from "./Profile";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface Articles {
  articles: Article[];
  articlesCount: number;
}
export interface UpdateArticle {
  title?: string;
  description?: string;
  body?: string;
}
