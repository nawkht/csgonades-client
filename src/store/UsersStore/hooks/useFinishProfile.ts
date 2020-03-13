import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "../../../api/UserApi";
import { UserUpdateDTO } from "../../../models/User";
import { setUserAction } from "../../AuthStore/AuthActions";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { setUsersError } from "../UsersActions";

export const useFinishProfile = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();
  const finishProfile = useCallback(
    async (steamId: string, updatedField: UserUpdateDTO) => {
      const token = await getToken();

      const result = await UserApi.updateUser(steamId, updatedField, token);

      if (!token) {
        console.error("Missing token, cant update.");
        return;
      }

      if (result.isErr()) {
        return dispatch(setUsersError(result.error));
      }

      setUserAction(dispatch, result.value);
    },
    [dispatch, getToken]
  );
  return finishProfile;
};
