import { AppState } from "..";

export const articlesSelector = (state: AppState) =>
  state.articleStore.articles;
