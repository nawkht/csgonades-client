import { Dispatch } from "redux";

type SetTokenAction = {
  type: "@@auth/SET_TOKEN";
  payload: string;
};

export type AuthActions = SetTokenAction;

export function setToken(dispatch: Dispatch, token: string) {
  dispatch({
    type: "@@auth/SET_TOKEN",
    payload: token
  });
}
