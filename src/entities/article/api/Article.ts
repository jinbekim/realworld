import type { Profile } from "@/entities/profile";
import type { Tag } from "@/entities/tag/api/tag";

export interface Article {
  slug: Name;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export const articleKeys = {
  article: {
    root: ['article'],
  }
}
