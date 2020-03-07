import { Reducer } from "redux";
import { BlogPostLight } from "../../models/BlogPost";
import { assertNever } from "../../utils/Common";
import { ArticleActions } from "./BlogActions";

export type BlogState = {
  blogPosts: BlogPostLight[];
};

const initialState: BlogState = {
  blogPosts: [],
};

export const BlogReducer: Reducer<BlogState, ArticleActions> = (
  state = initialState,
  action
): BlogState => {
  switch (action.type) {
    case "@@blog/REPLACE_BLOG_POSTS":
      return {
        ...state,
        blogPosts: action.blogPost,
      };
    default:
      assertNever(action.type);
      return state;
  }
};
