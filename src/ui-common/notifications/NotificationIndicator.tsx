import { FC, useMemo, useState } from "react";
import { Icon } from "semantic-ui-react";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NotificationList } from "./NotificationList";

export const NotificationIndicator: FC = () => {
  const [notificationTabVisible, setNotificationTabVisible] = useState(false);
  const { colors } = useTheme();
  const { notificationCount } = useNotifications();

  function toggleNotificationTab() {
    setNotificationTabVisible(!notificationTabVisible);
  }

  const notificationBtnClassNames = useMemo(() => {
    const classes = ["notification-indicator"];
    if (notificationCount) {
      classes.push("active");
    }
    return classes.join(" ");
  }, [notificationCount]);

  return (
    <>
      <div className="notification-wrapper">
        <button
          className={notificationBtnClassNames}
          onClick={toggleNotificationTab}
        >
          <Icon name="bell" />
          <span>{notificationCount}</span>
        </button>
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
          background: transparent;
          border: 1px solid ${colors.GREY};
          padding: 6px;
          border-radius: 4px;
          color: ${colors.GREY};
          cursor: pointer;
          font-weight: bold;
          transition: border 0.2s, color 0.2s;
        }

        .notification-indicator.active {
          border: 1px solid ${colors.PRIMARY};
          color: ${colors.PRIMARY};
        }

        .notification-indicator:hover {
          color: ${colors.TEXT};
          border: 1px solid ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
