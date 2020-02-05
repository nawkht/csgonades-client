import moment from "moment";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationsSelector } from "./NotificationSelectors";
import {
  fetchNotificationsThunk,
  markNotifcationAsViewedThunk,
} from "./NotificationThunks";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const rawNotifications = useSelector(notificationsSelector);

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
    dispatch(fetchNotificationsThunk());
  }, [dispatch]);

  return {
    notifications,
    notificationCount,
    markNotificationAsViewed,
    fetchNotifications,
  };
};
