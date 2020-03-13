import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "../../../api/UserApi";
import { UserUpdateDTO } from "../../../models/User";
import { setUserAction } from "../../AuthStore/AuthActions";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";

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

      const result = await UserApi.updateUser(steamId, updatedFields, token);

      if (result.isErr()) {
        return;
      }

      setUserAction(dispatch, result.value);
    },
    [dispatch, getToken]
  );

  return updateUser;
};
