import { Middleware } from "redux";
import { AppState } from "..";
import { AuthApi } from "../../api/TokenApi";
import { tokenExpiredOrAboutTo } from "../../utils/TokenUtil";
import { setToken, signOutUser } from "./AuthActions";

export const tokenRefreshMiddleware: Middleware<any, AppState> = ({
  dispatch,
  getState
}) => next => action => {
  if (typeof action === "function") {
    const token = getState().authStore.token;

    if (!token) {
      return next(action);
    }

    const shouldRefresh = tokenExpiredOrAboutTo(token);

    if (!shouldRefresh) {
      return next(action);
    }

    AuthApi.refreshToken()
      .then(tokenResult => {
        if (tokenResult.isErr()) {
          console.error("Failed to get new token, cookie expired?");
          return dispatch(signOutUser());
        }

        const token = tokenResult.value;
        dispatch(setToken(token));

        return next(action);
      })
      .catch(error => {
        console.error("Failed to refresh token", error);
        return dispatch(signOutUser());
      });
  } else {
    return next(action);
  }
};
