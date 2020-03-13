import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NadeApi } from "../../../api/NadeApi";
import { NadeStatusDTO } from "../../../models/Nade/Nade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addNotificationActionThunk } from "../../ToastStore/ToastThunks";

export const useUpdateNadeStatus = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const updateNadeStatus = useCallback(
    async (nadeId: string, updates: NadeStatusDTO) => {
      const authToken = await getToken();
      if (!authToken) {
        return dispatch(
          addNotificationActionThunk({
            message: "Can't update, seems like your not signed in.",
            severity: "error",
          })
        );
      }

      const result = await NadeApi.updateNadeStatus(nadeId, updates, authToken);

      if (result.isErr()) {
        return dispatch(
          addNotificationActionThunk({
            message: "Failed to update nade.",
            severity: "error",
          })
        );
      }

      console.warn("> Should replace nade");
    },
    [dispatch, getToken]
  );

  return updateNadeStatus;
};
