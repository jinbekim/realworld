import type { Article, NewArticle, UpdateArticle } from "./Article";

export interface IArticleRepository {
  getFeedArticles(): Promise<Article[]>;
  getArticles(): Promise<Article[]>;
  createArticle(article: NewArticle): Promise<Article>;
  getArticle(slug: string): Promise<Article>;
  updateArticle(slug: string, article: UpdateArticle): Promise<Article>;
  deleteArticle(slug: string): Promise<Article>;
}
