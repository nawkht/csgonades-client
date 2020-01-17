import { FC } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { notificationSelector } from "../../store/NotificationStore/NotificationSelectors";
import { NotificationItem } from "./NotificationItem";
export const Notifications: FC = () => {
  const { uiDimensions, layers } = useTheme();
  const notifications = useSelector(notificationSelector);

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
          bottom: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          right: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          z-index: ${layers.MODAL};
          display: flex;
          flex-direction: column;
          flex-basis: fit-content;
          align-items: flex-end;
        }
      `}</style>
    </>
  );
};
