import { fetcher } from '../fetcher';
import type { ProfileDto } from '../profile';

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

export const getFeedArticles = async (
  { limit = 20, offset = 0 }: Pagination,
  options: RequestInit = {}
): Promise<ArticlesDto> => {
  const params = new URLSearchParams();
  params.set('limit', limit.toString());
  params.set('offset', offset.toString());

  let url = `articles/feed` + '?' + params.toString();

  const response = await fetcher(url, {
    method: 'GET',
    ...options,
  });

  return response;
};

export const getArticles = async (
  {
    tag,
    author,
    favorited,
    limit = 20,
    offset = 0,
  }: {
    tag?: string;
    author?: string;
    favorited?: string;
  } & Pagination,
  options: RequestInit = {}
): Promise<ArticlesDto> => {
  const params = new URLSearchParams();
  if (tag) params.set('tag', tag);
  if (author) params.set('author', author);
  if (favorited) params.set('favorited', favorited);
  params.set('limit', limit.toString());
  params.set('offset', offset.toString());

  let url = `articles` + '?' + params.toString();

  const response = await fetcher(url, {
    method: 'GET',
    ...options,
  });
  return response;
};

export const createArticle = async (
  article: NewArticleDto,
  options: RequestInit = {}
): Promise<ArticleDto> => {
  const response = await fetcher('articles', {
    method: 'POST',
    body: JSON.stringify({ article }),
    ...options,
  });
  return response.article;
};

export const getArticle = async (
  slug: Name,
  options: RequestInit = {}
): Promise<ArticleDto> => {
  const response = await fetcher(`articles/${slug}`, {
    method: 'GET',
    ...options,
  });
  return response.article;
};

export const updateArticle = async (
  slug: Name,
  article: UpdateArticleDto,
  options: RequestInit = {}
): Promise<ArticleDto> => {
  const response = await fetcher(`articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({ article }),
    ...options,
  });
  return response.article;
};

export const deleteArticle = async (
  slug: Name,
  options: RequestInit = {}
): Promise<void> => {
  await fetcher(`articles/${slug}`, {
    method: 'DELETE',
    ...options,
  });
};
