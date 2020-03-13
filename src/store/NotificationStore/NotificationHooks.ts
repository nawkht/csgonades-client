import moment from "moment";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { notificationsSelector } from "./NotificationSelectors";

export const useNotifications = () => {
  const rawNotifications = useSelector(notificationsSelector);

  const notificationCount = useMemo(() => {
    return rawNotifications.filter(n => !n.viewed).length;
  }, [rawNotifications]);

  const notifications = useMemo(() => {
    return rawNotifications.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );
  }, [rawNotifications]);

  return {
    notifications,
    notificationCount,
  };
};
