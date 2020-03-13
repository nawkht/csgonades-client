import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { User } from "../../models/User";
import { assertNever } from "../../utils/Common";
import { AuthActions } from "./AuthActions";

export type AuthState = {
  user?: User;
  token?: string;
};

const initialState: AuthState = {};

const AuthReducerBase: Reducer<AuthState, AuthActions> = (
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

const persistConfig: PersistConfig<AuthState> = {
  key: "authStore",
  storage,
};

export const AuthReducer = persistReducer(persistConfig, AuthReducerBase);
