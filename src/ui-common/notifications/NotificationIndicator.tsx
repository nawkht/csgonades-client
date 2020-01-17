import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { NotificationList } from "./NotificationList";

export const NotificationIndicator: FC = () => {
  const [notificationTabVisible, setNotificationTabVisible] = useState(false);
  const { colors } = useTheme();
  const { notificationCount } = useNotifications();

  function toggleNotificationTab() {
    if (!notificationTabVisible) {
      GoogleAnalytics.event(
        "Notification",
        "Open tab",
        `Count(${notificationCount})`
      );
    }

    setNotificationTabVisible(!notificationTabVisible);
  }

  return (
    <>
      <div className="notification-wrapper">
        <div className="notification-indicator" onClick={toggleNotificationTab}>
          <Icon name="bell" />
          <span>{notificationCount}</span>
        </div>
        <NotificationList visble={notificationTabVisible} />
      </div>
      <style jsx>{`
        .notification-wrapper {
          display: flex;
          position: relative;
          margin-right: 18px;
          align-items: center;
          font-size: 0.9em;
        }

        .notification-indicator {
          border: 1px solid ${colors.GREY};
          padding: 6px;
          border-radius: 4px;
          color: ${colors.GREY};
          cursor: pointer;
          font-weight: bold;
          transition: border 0.2s, color 0.2s;
        }

        .notification-indicator:hover {
          color: ${colors.PRIMARY_BLACK};
          border: 1px solid ${colors.PRIMARY_BLACK};
        }
      `}</style>
    </>
  );
};
