import { Reducer } from "redux";
import { User } from "../../models/User";
import { assertNever } from "../../utils/Common";
import { AuthActions } from "./AuthActions";

export type AuthState = {
  user?: User;
  token?: string;
};

const initialState: AuthState = {};

export const AuthReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
): AuthState => {
  switch (action.type) {
    case "@@auth/SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "@@auth/SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "@@auth/SIGN_OUT":
      return {
        user: undefined,
        token: undefined,
      };
    default:
      assertNever(action);
      return state;
  }
};
