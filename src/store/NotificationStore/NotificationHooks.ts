import { useMemo } from "react";
import { useSelector } from "react-redux";
import { notificationsSelector } from "./NotificationSelectors";

export const useNotifications = () => {
  const rawNotifications = useSelector(notificationsSelector);

  const notificationCount = useMemo(() => {
    return rawNotifications.filter((n) => !n.viewed).length;
  }, [rawNotifications]);

  const notifications = useMemo(() => {
    return rawNotifications.sort((a, b) => dateSort(a.createdAt, b.createdAt));
  }, [rawNotifications]);

  return {
    notifications,
    notificationCount,
  };
};

function dateSort(a: Date | string, b: Date | string) {
  const aDate = typeof a === "string" ? new Date(a) : a;
  const bDate = typeof b === "string" ? new Date(b) : b;

  return bDate.getTime() - aDate.getTime();
}
