import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NadeApi } from "../../../api/NadeApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addNotificationActionThunk } from "../../ToastStore/ToastThunks";

export const useUpdateNadeUser = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const updateNadeUser = useCallback(
    async (nadeId: string, steamId: string) => {
      const authToken = await getToken();
      if (!authToken) {
        return dispatch(
          addNotificationActionThunk({
            message: "Can't update, seems like your not signed in.",
            severity: "error",
          })
        );
      }

      const result = await NadeApi.updateUser(nadeId, steamId, authToken);

      if (result.isErr()) {
        return dispatch(
          addNotificationActionThunk({
            message: "Failed to update user.",
            severity: "error",
          })
        );
      }

      console.warn("> Should replace nade");
    },
    [dispatch, getToken]
  );

  return updateNadeUser;
};
