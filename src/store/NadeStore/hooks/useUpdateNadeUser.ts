import { useCallback } from "react";
import { NadeApi } from "../../../api/NadeApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../ToastStore/hooks/useDisplayToast";

export const useUpdateNadeUser = () => {
  const getToken = useGetOrUpdateToken();
  const displayToast = useDisplayToast();

  const updateNadeUser = useCallback(
    async (nadeId: string, steamId: string) => {
      const authToken = await getToken();
      if (!authToken) {
        displayToast({
          message: "Can't update, seems like your not signed in.",
          severity: "error",
        });
        return;
      }

      const result = await NadeApi.updateUser(nadeId, steamId, authToken);

      if (result.isErr()) {
        displayToast({
          message: "Failed to update user.",
          severity: "error",
        });
        return;
      }

      console.warn("> Should replace nade");
    },
    [getToken, displayToast]
  );

  return updateNadeUser;
};
