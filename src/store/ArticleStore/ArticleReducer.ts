import { Reducer } from "redux";
import { ArticleLight } from "../../models/Article";
import { assertNever } from "../../utils/Common";
import { ArticleActions } from "./ArticleActions";

export type ArticleState = {
  articles: ArticleLight[];
};

const initialState: ArticleState = {
  articles: [],
};

export const ArticleReducer: Reducer<ArticleState, ArticleActions> = (
  state = initialState,
  action
): ArticleState => {
  switch (action.type) {
    case "@@articles/REPLACE_ARTICLES":
      return {
        ...state,
        articles: action.articles,
      };
    default:
      assertNever(action.type);
      return state;
  }
};
