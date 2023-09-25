import type { ArticleDto } from "../article";
import { fetcher } from "../fetcher";

export const addArticleFavorite = async (slug: Name, options: RequestInit = {}): Promise<ArticleDto> => {
  const response = await fetcher(`articles/${slug}/favorite`, {
    method: 'POST',
    ...options
  });
  return response.article;
}

export const deleteArticleFavorite = async (slug: Name, options: RequestInit = {}): Promise<void> => {
  const response = await fetcher(`articles/${slug}/favorite`, {
    method: 'DELETE',
    ...options
  });
  return response.article;
}
