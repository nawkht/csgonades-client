import { ArticleApi } from "../../api/ArticleApi";
import { ArticleCreateDto, ArticleUpdateDto } from "../../models/Article";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { addNotificationActionThunk } from "../ToastStore/ToastThunks";
import { replaceArticlesAction } from "./ArticleActions";

export const fetchArticlesThunk = (): ReduxThunkAction => {
  return async dispatch => {
    const result = await ArticleApi.getArticles();

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    return dispatch(replaceArticlesAction(result.value));
  };
};

export const createArticleThunk = (
  data: ArticleCreateDto
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't fetch user, seems like your not signed in.",
          severity: "error",
        })
      );
    }

    await ArticleApi.createArticle(data, authToken);
  };
};

export const updateArticleThunk = (
  data: ArticleUpdateDto
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't fetch user, seems like your not signed in.",
          severity: "error",
        })
      );
    }

    await ArticleApi.updateArticle(data, authToken);
  };
};
