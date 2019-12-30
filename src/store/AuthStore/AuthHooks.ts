import { useSelector } from "react-redux";
import { Nade } from "../../models/Nade/Nade";
import { userSelector } from "./AuthSelectors";
import {
  useReduxDispatch,
  ReduxThunkAction
} from "../StoreUtils/ThunkActionType";
import { AuthApi } from "../../api/TokenApi";
import { signOutUser, setToken, setUser } from "./AuthActions";
import { UserApi } from "../../api/UserApi";
import Router from "next/router";
import { redirectUserPage } from "../../utils/Common";
import { User } from "../../models/User";

export const useIsSignedIn = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }
  return true;
};

export const useIsAllowedNadeEdit = (nade: Nade): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator" || user.role === "moderator") {
    return true;
  }

  if (user.steamID === nade.steamId) {
    return true;
  }

  return false;
};

export const useIsAllowedUserEdit = (user: User): boolean => {
  const signedInUser = useSelector(userSelector);
  if (!signedInUser) {
    return false;
  }

  if (
    signedInUser.role === "administrator" ||
    signedInUser.role === "moderator"
  ) {
    return true;
  }

  if (signedInUser.steamID === user.steamID) {
    return true;
  }

  return false;
};

export const useIsAdminOrModerator = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator" || user.role === "moderator") {
    return true;
  }

  return false;
};

export const useSignOut = () => {
  const reduxDispatch = useReduxDispatch();
  return () => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      await AuthApi.signOut();
      dispatch(signOutUser());
    };
    reduxDispatch(thunk);
  };
};

export const usePreloadUser = () => {
  const reduxDispatch = useReduxDispatch();
  return (isFirstSignIn: boolean) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const tokenResult = await AuthApi.refreshToken();

      if (tokenResult.isErr()) {
        console.error(tokenResult.error);
        return;
      }

      const token = tokenResult.value;

      setToken(dispatch, token);

      const userResult = await UserApi.fetchSelf(token);

      if (userResult.isErr()) {
        console.error(userResult.error);
        return;
      }

      const user = userResult.value;

      setUser(dispatch, user);

      if (isFirstSignIn) {
        redirectUserPage(user.steamID);
      } else {
        Router.push("/");
      }
    };
    reduxDispatch(thunk);
  };
};
