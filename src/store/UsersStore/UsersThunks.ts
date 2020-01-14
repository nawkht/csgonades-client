import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { UserApi } from "../../api/UserApi";
import {
  setViewingUserAction,
  setUsersError,
  setUserNadesAction,
  startLoadingUserUpdateAction,
  stopLoadingUserUpdateAction,
  stopEditingUserAction
} from "./UsersActions";
import { NadeApi } from "../../api/NadeApi";
import { UserUpdateDTO } from "../../models/User";

export const fetchUserAction = (steamId: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;
    const userResult = await UserApi.fetchUser(steamId, token);

    if (userResult.isErr()) {
      console.log("> User error");
      dispatch(setUsersError(userResult.error));
      return;
    }
    console.log("> User ok", userResult.value);

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

export const updateUserThunk = (
  updatedField: UserUpdateDTO
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const steamId = getState().usersStore.viewingUser?.steamId;
    const token = getState().authStore.token;

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

    dispatch(setViewingUserAction(result.value));
    dispatch(stopEditingUserAction());
  };
};
