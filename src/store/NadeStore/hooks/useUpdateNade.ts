import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NadeApi } from "../../../api/NadeApi";
import { NadeUpdateBody } from "../../../models/Nade/Nade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../ToastStore/hooks/useDisplayToast";

export const useUpdateNade = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();
  const displayToast = useDisplayToast();

  const updateNade = useCallback(
    async (nadeId: string, data: NadeUpdateBody) => {
      const authToken = await getToken();

      if (!authToken) {
        console.error("Missing token");
        return;
      }

      const result = await NadeApi.update(nadeId, data, authToken);

      if (result.isErr()) {
        displayToast({
          message: "Failed to update nade.",
          severity: "error",
        });
        return;
      }

      console.warn("> Should replace nade");

      displayToast({
        message: "Updated nade details!",
        severity: "success",
      });
    },
    [dispatch, getToken]
  );

  return updateNade;
};
