import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "../../../api/UserApi";
import { UserUpdateDTO } from "../../../models/User";
import { setUserAction } from "../../AuthStore/AuthActions";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import {
  setUsersError,
  setViewingUserAction,
  startLoadingUserUpdateAction,
  stopEditingUserAction,
  stopLoadingUserUpdateAction,
} from "../UsersActions";

export const useUpdateUser = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const updateUser = useCallback(
    async (steamId: string, updatedFields: UserUpdateDTO) => {
      const token = await getToken();

      if (!steamId || !token) {
        console.warn("Not viewing a user or missing token, cant update.");
        return;
      }

      dispatch(startLoadingUserUpdateAction());
      const result = await UserApi.updateUser(steamId, updatedFields, token);
      dispatch(stopLoadingUserUpdateAction());

      if (result.isErr()) {
        return dispatch(setUsersError(result.error));
      }

      setUserAction(dispatch, result.value);

      dispatch(setViewingUserAction(result.value));
      dispatch(stopEditingUserAction());
    },
    [dispatch, getToken]
  );

  return updateUser;
};
