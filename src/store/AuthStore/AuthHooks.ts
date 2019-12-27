import { useSelector } from "react-redux";
import { Nade } from "../../models/Nade";
import { userSelector } from "./AuthSelectors";
import {
  useReduxDispatch,
  ReduxThunkAction
} from "../StoreUtils/ThunkActionType";
import { AuthApi } from "../../api/TokenApi";
import { signOutUser } from "./AuthActions";

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
