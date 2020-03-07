import { BlogPostLight } from "../../models/BlogPost";

type ReplaceBlogPosts = {
  type: "@@blog/REPLACE_BLOG_POSTS";
  blogPost: BlogPostLight[];
};

export const replaceArticlesAction = (
  articles: BlogPostLight[]
): ReplaceBlogPosts => ({
  type: "@@blog/REPLACE_BLOG_POSTS",
  blogPost: articles,
});

export type ArticleActions = ReplaceBlogPosts;
