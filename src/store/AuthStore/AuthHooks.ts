import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nade } from "../../models/Nade/Nade";
import { User } from "../../models/User";
import { userSelector } from "./AuthSelectors";
import {
  preloadUserThunkAction,
  signOutUserThunk,
  trySignInThunk,
} from "./AuthTunks";

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

  if (user.steamId === nade.steamId) {
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

  if (signedInUser.steamId === user.steamId) {
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

export const useIsAdmin = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator") {
    return true;
  }

  return false;
};

export const useSignOut = () => {
  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(signOutUserThunk());
  }, [dispatch]);
  return signOut;
};

export const usePreloadUser = () => {
  const dispatch = useDispatch();

  const preloadUser = useCallback(() => {
    dispatch(preloadUserThunkAction());
  }, [dispatch]);

  return preloadUser;
};

export const useTrySignIn = () => {
  const dispatch = useDispatch();

  const trySignIn = useCallback(() => {
    dispatch(trySignInThunk());
  }, [dispatch]);

  return trySignIn;
};
