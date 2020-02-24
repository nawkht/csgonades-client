import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArticleCreateDto, ArticleUpdateDto } from "../../models/Article";
import { articlesSelector } from "./ArticleSelectors";
import {
  createArticleThunk,
  fetchArticlesThunk,
  updateArticleThunk,
} from "./ArticleThunks";

export const useArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector(articlesSelector);

  const fetchArticles = useCallback(() => {
    dispatch(fetchArticlesThunk());
  }, [dispatch]);

  const createArticle = useCallback(
    (data: ArticleCreateDto) => {
      dispatch(createArticleThunk(data));
    },
    [dispatch]
  );

  const updateArticle = useCallback(
    (data: ArticleUpdateDto) => {
      dispatch(updateArticleThunk(data));
    },
    [dispatch]
  );

  const articleActions = {
    fetchArticles,
    createArticle,
    updateArticle,
  };

  const articleState = {
    articles,
  };

  return { articleActions, articleState };
};
