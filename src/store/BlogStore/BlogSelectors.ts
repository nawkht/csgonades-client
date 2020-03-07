import { AppState } from "..";

export const blogPostSelector = (state: AppState) => state.blogStore.blogPosts;
