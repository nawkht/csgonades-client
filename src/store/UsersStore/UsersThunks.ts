import { NadeApi } from "../../api/NadeApi";
import { UserApi } from "../../api/UserApi";
import { UserUpdateDTO } from "../../models/User";
import { setUserAction } from "../AuthStore/AuthActions";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  setUserNadesAction,
  setUsersError,
  setViewingUserAction,
  startLoadingUserUpdateAction,
  stopEditingUserAction,
  stopLoadingUserUpdateAction,
} from "./UsersActions";

export const fetchUserAction = (steamId: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = tokenSelector(state);

    const userResult = await UserApi.fetchUser(steamId, token);

    if (userResult.isErr()) {
      dispatch(setUsersError(userResult.error));
      return;
    }

    dispatch(setViewingUserAction(userResult.value));
  };
};

export const fetchNadesForUserAction = (steamId: string): ReduxThunkAction => {
  return async dispatch => {
    const result = await NadeApi.byUser(steamId);

    if (result.isErr()) {
      return dispatch(setUsersError(result.error));
    }

    return dispatch(setUserNadesAction(result.value));
  };
};

export const finishProfileThunk = (
  steamId: string,
  updatedField: UserUpdateDTO
) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = tokenSelector(state);

    const result = await UserApi.updateUser(steamId, updatedField, token);

    if (!token) {
      console.error("Missing token, cant update.");
      return;
    }

    if (result.isErr()) {
      return dispatch(setUsersError(result.error));
    }

    setUserAction(dispatch, result.value);
  };
};

export const updateUserThunk = (
  updatedField: UserUpdateDTO
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const steamId = state.usersStore.viewingUser?.steamId;
    const token = tokenSelector(state);

    if (!steamId || !token) {
      console.warn("Not viewing a user or missing token, cant update.");
      return;
    }

    dispatch(startLoadingUserUpdateAction());
    const result = await UserApi.updateUser(steamId, updatedField, token);
    dispatch(stopLoadingUserUpdateAction());

    if (result.isErr()) {
      return dispatch(setUsersError(result.error));
    }

    setUserAction(dispatch, result.value);

    dispatch(setViewingUserAction(result.value));
    dispatch(stopEditingUserAction());
  };
};
