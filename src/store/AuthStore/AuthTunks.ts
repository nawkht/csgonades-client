import moment from "moment";
import Router from "next/router";
import { FavoriteApi } from "../../api/FavoriteApi";
import { NotificationApi } from "../../api/NotificationApi";
import { AuthApi } from "../../api/TokenApi";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";
import { redirectUserPage } from "../../utils/Common";
import { addAllFavoritesAction } from "../FavoriteStore/FavoriteActions";
import { addUnreadNotificationsAction } from "../NotificationStore/NotificationActions";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { setToken, setUser, signOutUser } from "./AuthActions";

function checkIsFirstSignIn(user: User): boolean {
  const minutesAgoCreated = moment().diff(
    moment(user.createdAt),
    "minute",
    false
  );

  return minutesAgoCreated < 2;
}

export const serverSideUserInitThunkAction = (
  cookie?: string
): ReduxThunkAction => {
  return async dispatch => {
    const tokenResult = await AuthApi.refreshToken(cookie);

    // User not signed in, make sure store auth store is empty
    if (tokenResult.isErr()) {
      console.warn("> No token cookie");
      return dispatch(signOutUser());
    }

    const authToken = tokenResult.value;

    dispatch(setToken(authToken));

    const userResult = await UserApi.fetchSelf(authToken);

    if (userResult.isErr()) {
      console.warn("> serverSideUserInitThunkAction > Failed to load self");
      return dispatch(signOutUser());
    }

    setUser(dispatch, userResult.value);
    console.log("> Set user");

    // Preload user state
    const [favoriteResult, notificationsResult] = await Promise.all([
      FavoriteApi.getUserFavorites(authToken),
      NotificationApi.getNotifications(authToken),
    ]);

    if (notificationsResult.isOk()) {
      dispatch(addUnreadNotificationsAction(notificationsResult.value));
    }

    if (favoriteResult.isOk()) {
      dispatch(addAllFavoritesAction(favoriteResult.value));
    }
  };
};

export const preloadUserThunkAction = (): ReduxThunkAction => {
  return async dispatch => {
    console.log("> preloadUserThunkAction > refreshToken");
    const tokenResult = await AuthApi.refreshToken();

    if (tokenResult.isErr()) {
      console.log("> preloadUserThunkAction > tokenResult err");
      return Router.push("/");
    }

    const token = tokenResult.value;

    console.log("> preloadUserThunkAction > setToken");
    dispatch(setToken(token));

    console.log("> preloadUserThunkAction > fetchSelf");
    const userResult = await UserApi.fetchSelf(token);

    if (userResult.isErr()) {
      console.warn("> preloadUserThunkAction > userResult err");
      return Router.push("/");
    }

    const user = userResult.value;

    setUser(dispatch, user);
    console.log("> preloadUserThunkAction > setUser");

    const isFirstSignIn = checkIsFirstSignIn(user);

    if (isFirstSignIn) {
      redirectUserPage(user.steamId, true);
    } else {
      Router.push("/");
    }
  };
};

export const signOutUserThunk = (): ReduxThunkAction => {
  return async dispatch => {
    await AuthApi.signOut();
    dispatch(signOutUser());
  };
};
