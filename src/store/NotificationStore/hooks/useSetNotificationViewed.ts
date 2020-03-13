import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NotificationApi } from "../../../api/NotificationApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { markNotificationAsSeenAction } from "../NotificationActions";

export const useSetNotificationViewed = (id: string) => {
  const dispatch = useDispatch();
  const getToken = useGetOrUpdateToken();

  useEffect(() => {
    (async () => {
      const authToken = await getToken();

      if (!authToken) {
        console.error("Missing token");
        return;
      }

      dispatch(markNotificationAsSeenAction(id));

      await NotificationApi.markAsViewed(id, authToken);
    })();
  }, [getToken, dispatch, id]);
};
