import { Middleware } from "redux";
import { AppState } from "..";
import { tokenExpiredOrAboutTo } from "../../utils/TokenUtil";

let thunkBuffer = [];

export const tokenRefreshMiddleware: Middleware<
  any,
  AppState
> = store => next => action => {
  if (typeof action === "function") {
    const token = store.getState().auth.token;

    if (!token) {
      return next(action);
    }

    const shouldRefresh = tokenExpiredOrAboutTo(token);

    console.log("> Should refresh token", shouldRefresh);

    return next(action);
  }
  return next(action);
};
