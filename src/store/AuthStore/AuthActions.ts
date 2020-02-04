import { Dispatch } from "redux";
import { User } from "../../models/User";
import { Meta } from "../Analytics/AnalyticsMiddleware";

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
  meta: Meta;
};

export type AuthActions = SetTokenAction | SetUserAction | SignOutAction;

export const setToken = (token: string) => ({
  type: "@@auth/SET_TOKEN",
  payload: token
});

export const signOutUser = (): SignOutAction => ({
  type: "@@auth/SIGN_OUT",
  meta: {
    gaEvent: {}
  }
});

export function setUser(dispatch: Dispatch, user: User) {
  dispatch({
    type: "@@auth/SET_USER",
    payload: user
  });
}
