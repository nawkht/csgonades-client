import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationApi } from "../../../api/NotificationApi";
import { userSelector } from "../../AuthStore/AuthSelectors";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addUnreadNotificationsAction } from "../NotificationActions";

export const useFetchNotifications = () => {
  const dispatch = useDispatch();
  const getToken = useGetOrUpdateToken();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      return;
    }

    const delay = setTimeout(() => {
      (async () => {
        const authToken = await getToken();

        if (!authToken) {
          return;
        }

        const result = await NotificationApi.getNotifications(authToken);

        if (result.isErr()) {
          console.error(result.error);
          return;
        }

        dispatch(addUnreadNotificationsAction(result.value));
      })();
    }, 1000);

    return () => clearTimeout(delay);
  }, [user, dispatch, getToken]);
};
