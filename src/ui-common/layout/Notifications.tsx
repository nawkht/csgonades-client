import { FC } from "react";
import { useSelector } from "react-redux";
import { notificationSelector } from "../../store/NotificationStore/NotificationSelectors";
import { NotificationItem } from "./NotificationItem";
export const Notifications: FC = () => {
  const notifications = useSelector(notificationSelector);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <>
      <div className="notification-container">
        {notifications.map(noti => (
          <NotificationItem key={noti.id} notification={noti} />
        ))}
      </div>
      <style jsx>{`
        .notification-container {
          position: fixed;
          bottom: 18px;
          right: 18px;
          z-index: 999;
          width: 200px;
          padding: 16px;
        }
      `}</style>
    </>
  );
};
