import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";

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
    const state = getState();
    const user = await UserApi.fetchSelf(state.auth.token);
    dispatch({ type: "@@auth/SET_USER", payload: user });
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
