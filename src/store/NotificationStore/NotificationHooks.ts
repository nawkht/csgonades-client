import moment from "moment";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationThunk } from "../NotificationStore/NotificationThunks";
import {
  lastNotificaitonFetch,
  notificationsSelector,
} from "./NotificationSelectors";
import { markNotifcationAsViewedThunk } from "./NotificationThunks";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const rawNotifications = useSelector(notificationsSelector);
  const lastFetch = useSelector(lastNotificaitonFetch);

  const notificationCount = useMemo(() => {
    return rawNotifications.filter(n => !n.viewed).length;
  }, [rawNotifications]);

  const notifications = useMemo(() => {
    return rawNotifications.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );
  }, [rawNotifications]);

  const markNotificationAsViewed = useCallback(
    (id: string) => {
      dispatch(markNotifcationAsViewedThunk(id));
    },
    [dispatch]
  );

  const fetchNotifications = useCallback(() => {
    if (lastFetch) {
      const minutesSinceFetch = moment().diff(
        moment(lastFetch),
        "minutes",
        false
      );

      // Only fetch notifications every 5 min
      if (minutesSinceFetch < 5) {
        return;
      }
    }

    dispatch(fetchNotificationThunk());
  }, [dispatch, lastFetch]);

  return {
    notifications,
    notificationCount,
    markNotificationAsViewed,
    fetchNotifications,
  };
};
