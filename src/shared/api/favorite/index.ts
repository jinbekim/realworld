import type { ArticleDto } from "../article";
import { fetcher } from "../fetcher";

export const addArticleFavorite = async (slug: Name): Promise<ArticleDto> => {
  const response = await fetcher(`articles/${slug}/favorite`, {
    method: 'POST',
  });
  return response.article;
}

export const deleteArticleFavorite = async (slug: Name):Promise<void> => {
  const response = await fetcher(`articles/${slug}/favorite`, {
    method: 'DELETE',
  });
  return response.article;
}
