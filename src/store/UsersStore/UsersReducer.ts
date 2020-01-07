import { Reducer } from "redux";
import { User } from "../../models/User";
import { UsersActions } from "./UsersActions";
import { NadeLight } from "../../models/Nade/Nade";
import { AppError } from "../../utils/ErrorUtil";
import { assertNever } from "../../utils/Common";

export type UsersState = {
  viewingUser?: User;
  userNades: NadeLight[];
  error?: AppError;
  isEditing: boolean;
  isLoading: boolean;
};

const initialState: UsersState = {
  isEditing: false,
  userNades: [],
  isLoading: false
};

export const UsersReducer: Reducer<UsersState, UsersActions> = (
  state = initialState,
  action
): UsersState => {
  switch (action.type) {
    case "@@users/SET_VIEWING_USER":
      return {
        ...state,
        viewingUser: action.user
      };
    case "@@users/START_EDITING_USER":
      return {
        ...state,
        isEditing: true
      };
    case "@@users/STOP_EDITING_USER":
      return {
        ...state,
        isEditing: false
      };
    case "@@users/SET_USER_NADES":
      return {
        ...state,
        userNades: action.nades
      };
    case "@@users/START_LOADING_UPDATE_USER":
      return {
        ...state,
        error: undefined,
        isLoading: true
      };
    case "@@users/SET_ERROR": {
      return {
        ...state,
        error: action.error
      };
    }
    case "@@users/STOP_LOADING_UPDATE_USER":
      return {
        ...state,
        isLoading: false
      };
    default:
      assertNever(action);
      return state;
  }
};
