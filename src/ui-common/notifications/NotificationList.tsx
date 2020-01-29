import { FC } from "react";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
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
          top: calc(100% + 15px);
          right: 0;
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP01};
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          display: flex;
          flex-direction: column;
        }

        .no-noti {
          white-space: nowrap;
          border: 1px solid ${colors.BORDER};
          padding: 6px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};
