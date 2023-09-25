import { fetcher } from "../fetcher";
import type { ProfileDto } from "../profile";
import { addQueryParam } from "../utils";

export interface ArticleDto {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileDto;
}

export interface NewArticleDto {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface ArticlesDto {
  articles: ArticleDto[];
  articlesCount: number;
}

export interface UpdateArticleDto {
  title?: string;
  description?: string;
  body?: string;
}


export const getFeedArticles = async ({
  limit = 20,
  offset = 0,
}: Pagination): Promise<ArticlesDto> => {
  let url = `articles/feed`;
  url = addQueryParam(url, 'limit', limit.toString());
  url = addQueryParam(url, 'offset', offset.toString());

  const response = await fetcher(url, {
    method: 'GET',
  });

  return response;
}

export const getArticles = async ({
  tag,
  author,
  favorited,
  pagination: { limit = 20, offset = 0 },
}: {
  tag: string;
  author: string;
  favorited: string;
  pagination: Pagination;
}): Promise<ArticlesDto> => {

  let url = `articles`;
  url = addQueryParam(url, 'tag', tag);
  url = addQueryParam(url, 'author', author);
  url = addQueryParam(url, 'favorited', favorited);
  url = addQueryParam(url, 'limit', limit.toString());
  url = addQueryParam(url, 'offset', offset.toString());

  const response = await fetcher(url, {
    method: 'GET',
  });
  return response;
}


export const createArticle = async (article: NewArticleDto): Promise<ArticleDto> => {
  const response = await fetcher('articles', {
    method: 'POST',

    body: JSON.stringify({ article }),
  });
  return response.article;
}


export const getArticle = async (slug:Name): Promise<ArticleDto> => {
  const response = await fetcher(`articles/${slug}`, {
    method: 'GET',
  });
  return response.article;
}


export const updateArticle = async (slug: Name, article: UpdateArticleDto): Promise<ArticleDto> => {
  const response = await fetcher(`articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({ article }),
  });
  return response.article;
}

export const deleteArticle = async (slug: Name): Promise<void> => {
  await fetcher(`articles/${slug}`, {
    method: 'DELETE',
  });
}
