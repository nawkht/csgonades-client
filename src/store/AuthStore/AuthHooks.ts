import moment from "moment";
import Router from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthApi } from "../../api/TokenApi";
import { UserApi } from "../../api/UserApi";
import { Nade } from "../../models/Nade/Nade";
import { User } from "../../models/User";
import { setToken, setUserAction, signOutUser } from "./AuthActions";
import { tokenSelector, userSelector } from "./AuthSelectors";

export const useSignedInUser = () => {
  const user = useSelector(userSelector);
  return user;
};

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
    AuthApi.signOut().then(() => {
      dispatch(signOutUser());
    });
  }, [dispatch]);
  return signOut;
};

export const useTrySignIn = () => {
  const token = useSelector(tokenSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const trySignIn = useCallback(() => {
    if (user && token) {
      return;
    }

    (async () => {
      const { userDetails, userToken } = await trySignInFunc();
      dispatch(setToken(userToken));
      setUserAction(dispatch, userDetails);
    })();
  }, [dispatch, token, user]);

  return trySignIn;
};

async function trySignInFunc() {
  const tokenResult = await AuthApi.refreshToken();

  if (tokenResult.isErr()) {
    return;
  }

  const userToken = tokenResult.value;

  const userResult = await UserApi.fetchSelf(userToken);

  if (userResult.isErr()) {
    return;
  }

  const user = userResult.value;

  return {
    userToken,
    userDetails: user,
  };
}

export const useOnSignIn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { userDetails, userToken } = await trySignInFunc();
      if (!userDetails || !userToken) {
        Router.push("/");
      }

      dispatch(setToken(userToken));
      setUserAction(dispatch, userDetails);

      const isFirstSignIn = checkIsFirstSignIn(userDetails);

      if (isFirstSignIn || userDetails.steamId === "76561198199195838") {
        Router.push(`/finishprofile`);
      } else {
        Router.push("/");
      }
    })();
  }, [dispatch]);
};

function checkIsFirstSignIn(user: User): boolean {
  const minutesAgoCreated = moment().diff(
    moment(user.createdAt),
    "minute",
    false
  );

  return minutesAgoCreated < 2;
}
