import { useSelector, useDispatch } from "react-redux";
import { Nade } from "../../models/Nade/Nade";
import { userSelector } from "./AuthSelectors";
import { User } from "../../models/User";
import { signOutUserThunk, preloadUserThunkAction } from "./AuthTunks";

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
  const dispatch = useDispatch();
  return () => dispatch(signOutUserThunk());
};

export const usePreloadUser = () => {
  const dispatch = useDispatch();
  return (isFirstSignIn: boolean) =>
    dispatch(preloadUserThunkAction(isFirstSignIn));
};
