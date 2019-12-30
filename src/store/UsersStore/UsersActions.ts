import { User } from "../../models/User";
import { AppError } from "../../utils/ErrorUtil";
import { NadeLight } from "../../models/Nade/Nade";

type SetViewingUserAction = {
  type: "@@users/SET_VIEWING_USER";
  user: User;
};

type SetUserNadesAction = {
  type: "@@users/SET_USER_NADES";
  nades: NadeLight[];
};

type StartLoadingUserUpdate = {
  type: "@@users/START_LOADING_UPDATE_USER";
};

type StopLoadingUserUpdate = {
  type: "@@users/STOP_LOADING_UPDATE_USER";
};

type SetUsersErrorAction = {
  type: "@@users/SET_ERROR";
  error: AppError;
};

type StartEditingUserAction = {
  type: "@@users/START_EDITING_USER";
};

type StopEditingUserAction = {
  type: "@@users/STOP_EDITING_USER";
};

export type UsersActions =
  | StartLoadingUserUpdate
  | StopLoadingUserUpdate
  | SetViewingUserAction
  | SetUserNadesAction
  | SetUsersErrorAction
  | StartEditingUserAction
  | StopEditingUserAction;

export const setViewingUserAction = (user: User): SetViewingUserAction => ({
  type: "@@users/SET_VIEWING_USER",
  user
});

export const setUserNadesAction = (nades: NadeLight[]): SetUserNadesAction => ({
  type: "@@users/SET_USER_NADES",
  nades
});

export const setUsersError = (error: AppError): SetUsersErrorAction => ({
  type: "@@users/SET_ERROR",
  error
});

export const startEditingUserAction = (): StartEditingUserAction => ({
  type: "@@users/START_EDITING_USER"
});

export const stopEditingUserAction = (): StopEditingUserAction => ({
  type: "@@users/STOP_EDITING_USER"
});

export const startLoadingUserUpdateAction = (): StartLoadingUserUpdate => ({
  type: "@@users/START_LOADING_UPDATE_USER"
});

export const stopLoadingUserUpdateAction = (): StopLoadingUserUpdate => ({
  type: "@@users/STOP_LOADING_UPDATE_USER"
});
