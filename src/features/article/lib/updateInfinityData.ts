import type { Article } from '@/entities/article';
import type { InfiniteData } from '@tanstack/vue-query';

export type ArticlesInfinityData = InfiniteData<{
  articles: Article[];
  count: number;
}>;

export const updateInfinityData = (
  infinityData: ArticlesInfinityData,
  newArticle: Article
) => {
  const articleOrderIdx = infinityData.pages
    .flatMap((data) => data.articles)
    .findIndex((article) => article.slug === newArticle.slug);

  if (articleOrderIdx === -1) return { ...infinityData };

  const pageLength = infinityData.pages[0].articles.length;
  const [pageIdx, articleIdx] = [
    Math.floor(articleOrderIdx / pageLength),
    articleOrderIdx % pageLength,
  ];

  const newArticlesInfinityData: ArticlesInfinityData = {
    pages: [
      ...infinityData.pages.slice(0, pageIdx),
      {
        articles: [
          ...infinityData.pages[pageIdx].articles.slice(0, articleIdx),
          newArticle,
          ...infinityData.pages[pageIdx].articles.slice(articleIdx + 1),
        ],
        count: infinityData.pages[pageIdx].count,
      },
      ...infinityData.pages.slice(pageIdx + 1),
    ],

    pageParams: [...infinityData.pageParams],
  };

  return newArticlesInfinityData;
};
