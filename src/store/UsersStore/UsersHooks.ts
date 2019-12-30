import { useDispatch, useSelector } from "react-redux";
import { User, UserUpdateDTO } from "../../models/User";
import {
  setViewingUserAction,
  startEditingUserAction,
  stopEditingUserAction,
  setUserNadesAction,
  setUsersError,
  startLoadingUserUpdateAction,
  stopLoadingUserUpdateAction
} from "./UsersActions";
import {
  viewingUserSelector,
  isEditingUserSelector,
  userNadesSelector,
  userErrorSelector,
  isUpdatingUserSelector
} from "./UsersSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { NadeApi } from "../../api/NadeApi";
import { UserApi } from "../../api/UserApi";

export const useUsersActions = () => {
  const dispatch = useDispatch();

  const setViewingUser = (user: User) => dispatch(setViewingUserAction(user));
  const startEditingUser = () => dispatch(startEditingUserAction());
  const stopEditingUser = () => dispatch(stopEditingUserAction());
  const fetchUserNades = () => dispatch(fetchNadesForUserThunk());
  const updateUser = (updatedFields: UserUpdateDTO) =>
    dispatch(updateUserThunk(updatedFields));

  return {
    setViewingUser,
    startEditingUser,
    stopEditingUser,
    fetchUserNades,
    updateUser
  };
};

export const useUsersState = () => {
  const user = useSelector(viewingUserSelector);
  const isEditing = useSelector(isEditingUserSelector);
  const nades = useSelector(userNadesSelector);
  const error = useSelector(userErrorSelector);
  const isUpdatingUser = useSelector(isUpdatingUserSelector);
  return { user, isEditing, nades, error, isUpdatingUser };
};

const fetchNadesForUserThunk = () => {
  const thunk: ReduxThunkAction = async (dispatch, getState) => {
    const steamId = getState().usersStore.viewingUser?.steamID;

    if (!steamId) {
      console.warn("Not viewing a user, cant fetch nades for the user.");
      return;
    }

    const result = await NadeApi.byUser(steamId);

    if (result.isErr()) {
      return dispatch(setUsersError(result.error));
    }

    return dispatch(setUserNadesAction(result.value));
  };
  return thunk;
};

const updateUserThunk = (updatedField: UserUpdateDTO) => {
  const thunk: ReduxThunkAction = async (dispatch, getState) => {
    const steamId = getState().usersStore.viewingUser?.steamID;
    const token = getState().auth.token;

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
  return thunk;
};
