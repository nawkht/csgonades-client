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
  const notifications = useSelector(notificationsSelector);

  const notificationCount = useMemo(() => {
    return notifications.filter(n => !n.viewed).length;
  }, [notifications]);

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
