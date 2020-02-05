import moment from "moment";
import Router from "next/router";
import { FavoriteApi } from "../../api/FavoriteApi";
import { AuthApi } from "../../api/TokenApi";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";
import { redirectUserPage } from "../../utils/Common";
import { addAllFavoritesAction } from "../FavoriteStore/FavoriteActions";
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
      return dispatch(signOutUser());
    }

    const authToken = tokenResult.value;

    dispatch(setToken(authToken));

    // Preload state
    const [userResult, favoriteResult] = await Promise.all([
      UserApi.fetchSelf(authToken),
      FavoriteApi.getUserFavorites(authToken),
    ]);

    if (userResult.isErr() || favoriteResult.isErr()) {
      return dispatch(signOutUser());
    }

    const user = userResult.value;
    const favorites = favoriteResult.value;

    setUser(dispatch, user);
    dispatch(addAllFavoritesAction(favorites));
    return;
  };
};

export const preloadUserThunkAction = (): ReduxThunkAction => {
  return async dispatch => {
    const tokenResult = await AuthApi.refreshToken();

    if (tokenResult.isErr()) {
      return Router.push("/");
    }

    const token = tokenResult.value;

    dispatch(setToken(token));

    const userResult = await UserApi.fetchSelf(token);

    if (userResult.isErr()) {
      return Router.push("/");
    }

    const user = userResult.value;

    setUser(dispatch, user);

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
