import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogPostCreateDto, BlogPostUpdateDto } from "../../models/BlogPost";
import { blogPostSelector } from "./BlogSelectors";
import {
  createArticleThunk,
  fetchArticlesThunk,
  updateArticleThunk,
} from "./BlogThunks";

export const useBlog = () => {
  const dispatch = useDispatch();
  const blogPosts = useSelector(blogPostSelector);

  const fetchBlogPosts = useCallback(() => {
    dispatch(fetchArticlesThunk());
  }, [dispatch]);

  const createBlogPost = useCallback(
    (data: BlogPostCreateDto) => {
      dispatch(createArticleThunk(data));
    },
    [dispatch]
  );

  const updateBlogPost = useCallback(
    (data: BlogPostUpdateDto) => {
      dispatch(updateArticleThunk(data));
    },
    [dispatch]
  );

  const blogActions = {
    fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
  };

  const blogState = {
    blogPosts,
  };

  return { blogActions, blogState };
};
