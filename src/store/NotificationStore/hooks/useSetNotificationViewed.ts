import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NotificationApi } from "../../../api/NotificationApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { markNotificationAsSeenAction } from "../NotificationActions";

export const useSetNotificationViewed = () => {
  const dispatch = useDispatch();
  const getToken = useGetOrUpdateToken();

  const setNotificationAsViewed = useCallback(
    async (id: string) => {
      const authToken = await getToken();

      if (!authToken) {
        console.error("Missing token");
        return;
      }

      dispatch(markNotificationAsSeenAction(id));

      await NotificationApi.markAsViewed(id, authToken);
    },
    [getToken, dispatch]
  );

  return setNotificationAsViewed;
};
