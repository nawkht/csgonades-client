import { Dispatch } from "redux";
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

export const setToken = (token: string) => ({
  type: "@@auth/SET_TOKEN",
  payload: token
});

export const signOutUser = (): SignOutAction => ({
  type: "@@auth/SIGN_OUT"
});

export function setUser(dispatch: Dispatch, user: User) {
  dispatch({
    type: "@@auth/SET_USER",
    payload: user
  });
}
