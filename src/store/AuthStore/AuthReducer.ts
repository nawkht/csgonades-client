import { Reducer } from "redux";
import { AuthActions } from "./AuthActions";

export type AuthState = {
  user: null;
  token?: string;
};

const initialState: AuthState = {
  user: null
};

export const AuthReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "@@auth/SET_TOKEN":
      console.log("Setting token");
      return {
        ...state,
        authToken: action.payload
      };
    default:
      return state;
  }
};
