import { FC } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { NotificationItem } from "./NotificationItem";

type Props = {
  visble: boolean;
};

export const NotificationList: FC<Props> = ({ visble }) => {
  const { notifications } = useNotifications();
  const { colors } = useTheme();
  if (!visble) {
    return null;
  }

  const hasNotifications = notifications.length > 0;

  return (
    <>
      <div className="notification-list">
        {!hasNotifications && (
          <div className="no-noti">No new notifications.</div>
        )}
        {hasNotifications &&
          notifications.map(n => (
            <NotificationItem key={n.id} notification={n} />
          ))}
      </div>
      <style jsx>{`
        .notification-list {
          position: absolute;
          top: calc(100% + 13px);
          right: 0;
          border: 1px solid ${colors.PRIMARY_BORDER};
          background: white;
          padding: 12px 18px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          display: flex;
          flex-direction: column;
        }

        .no-noti {
          white-space: nowrap;
          border: 1px solid ${colors.PRIMARY_BORDER};
          padding: 6px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};
