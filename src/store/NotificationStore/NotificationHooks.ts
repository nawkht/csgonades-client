import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { notificationsSelector } from "./NotificationSelectors";
import {
  fetchNotifications,
  markNotifcationAsViewedThunk
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
      GoogleAnalytics.event("Notification", "Marked as viewed");
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  return {
    notifications,
    notificationCount,
    markNotificationAsViewed
  };
};
