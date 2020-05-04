import { FC, memo, useMemo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useFetchNotifications } from "../../store/NotificationStore/hooks/useFetchNotifications";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NotificationList } from "./NotificationList";

export const NotificationIndicator: FC = memo(() => {
  const [notificationTabVisible, setNotificationTabVisible] = useState(false);
  const { colors } = useTheme();
  const { notificationCount } = useNotifications();
  useFetchNotifications();

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
          <FaBell style={{ position: "relative", top: 1, left: -2 }} />
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
          z-index: 999;
        }

        .notification-indicator {
          background: transparent;
          border: 1px solid ${colors.BORDER};
          padding: 6px;
          border-radius: 4px;
          color: ${colors.GREY};
          cursor: pointer;
          font-weight: bold;
          transition: border 0.2s, color 0.2s;
          outline: none;
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
});
