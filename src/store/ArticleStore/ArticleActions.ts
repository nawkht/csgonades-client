import { Article } from "../../models/Article";

type ReplaceArticles = {
  type: "@@articles/REPLACE_ARTICLES";
  articles: Article[];
};

export const replaceArticlesAction = (
  articles: Article[]
): ReplaceArticles => ({
  type: "@@articles/REPLACE_ARTICLES",
  articles,
});

export type ArticleActions = ReplaceArticles;
