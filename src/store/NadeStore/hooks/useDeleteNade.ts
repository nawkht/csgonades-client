import Router from "next/router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NadeApi } from "../../../api/NadeApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addNotificationActionThunk } from "../../ToastStore/ToastThunks";

export const useDeleteNade = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const deleteNade = useCallback(
    async (nadeId: string) => {
      const authToken = await getToken();

      if (!authToken) {
        return dispatch(
          addNotificationActionThunk({
            message: "Can't update, seems like your not signed in.",
            severity: "error",
          })
        );
      }

      const result = await NadeApi.delete(nadeId, authToken);

      if (result.isErr()) {
        return dispatch(
          addNotificationActionThunk({
            message: "Failed to delete nade.",
            severity: "error",
          })
        );
      }

      Router.push("/", "/");
    },
    [getToken, dispatch]
  );

  return deleteNade;
};
