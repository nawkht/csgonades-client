import { BlogApi } from "../../api/BlogApi";
import { BlogPostCreateDto, BlogPostUpdateDto } from "../../models/BlogPost";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { addNotificationActionThunk } from "../ToastStore/ToastThunks";
import { replaceArticlesAction } from "./BlogActions";

export const fetchArticlesThunk = (): ReduxThunkAction => {
  return async dispatch => {
    const result = await BlogApi.getBlogPosts();

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    return dispatch(replaceArticlesAction(result.value));
  };
};

export const createArticleThunk = (
  data: BlogPostCreateDto
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

    await BlogApi.createBlogPost(data, authToken);
  };
};

export const updateArticleThunk = (
  data: BlogPostUpdateDto
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

    await BlogApi.updateBlogPost(data, authToken);
  };
};
