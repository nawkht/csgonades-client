import { useCallback } from "react";
import { NadeApi } from "../../../api/NadeApi";
import { NadeStatusDTO } from "../../../models/Nade/Nade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../ToastStore/hooks/useDisplayToast";

export const useUpdateNadeStatus = () => {
  const getToken = useGetOrUpdateToken();
  const displayToast = useDisplayToast();

  const updateNadeStatus = useCallback(
    async (nadeId: string, updates: NadeStatusDTO) => {
      const authToken = await getToken();
      if (!authToken) {
        displayToast({
          message: "Can't update, seems like your not signed in.",
          severity: "error",
        });
        return;
      }

      const result = await NadeApi.updateNadeStatus(nadeId, updates, authToken);

      if (result.isErr()) {
        displayToast({
          message: "Failed to update nade.",
          severity: "error",
        });
        return;
      }

      console.warn("> Should replace nade");
    },
    [getToken, displayToast]
  );

  return updateNadeStatus;
};
