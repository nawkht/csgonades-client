import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NadeApi } from "../../../api/NadeApi";
import { NadeUpdateBody } from "../../../models/Nade/Nade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addNotificationActionThunk } from "../../ToastStore/ToastThunks";

export const useUpdateNade = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const updateNade = useCallback(
    async (nadeId: string, data: NadeUpdateBody) => {
      const authToken = await getToken();

      if (!authToken) {
        console.error("Missing token");
        return;
      }

      const result = await NadeApi.update(nadeId, data, authToken);

      if (result.isErr()) {
        return dispatch(
          addNotificationActionThunk({
            message: "Failed to update nade.",
            severity: "error",
          })
        );
      }

      console.warn("> Should replace nade");

      dispatch(
        addNotificationActionThunk({
          message: "Updated nade details!",
          severity: "success",
        })
      );
    },
    [dispatch, getToken]
  );

  return updateNade;
};
