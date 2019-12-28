import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";
import { tokenSelector } from "./AuthSelectors";
import { addNotificationAction } from "../NotificationStore/NotificationActions";

type SetTokenAction = {
  type: "@@auth/SET_TOKEN";
  payload: string;
};

type SetUserAction = {
  type: "@@auth/SET_USER";
  payload: User;
};

type SignOutAction = {
  type: "@@auth/SIGN_OUT";
};

export type AuthActions = SetTokenAction | SetUserAction | SignOutAction;

export function fetchUser(dispatchFunc: Dispatch<any>) {
  const thunk: ThunkAction<any, AppState, any, AuthActions> = async (
    dispatch,
    getState
  ) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return addNotificationAction(dispatch, {
        message: "Can't fetch user, seems like your not signed in.",
        severity: "error"
      });
    }

    const userResult = await UserApi.fetchSelf(authToken);

    if (userResult.isErr()) {
      return addNotificationAction(dispatch, {
        message: userResult.error.message,
        severity: "error"
      });
    }
    setUser(dispatch, userResult.value);
  };
  dispatchFunc(thunk);
}

export function setToken(dispatch: Dispatch, token: string) {
  dispatch({
    type: "@@auth/SET_TOKEN",
    payload: token
  });
}

export const signOutUser = (): SignOutAction => ({
  type: "@@auth/SIGN_OUT"
});

export function setUser(dispatch: Dispatch, user: User) {
  dispatch({
    type: "@@auth/SET_USER",
    payload: user
  });
}
