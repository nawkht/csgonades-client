import {
  NotificationSeverity,
  AppNotification
} from "../../store/NotificationStore/NotificationActions";
import { FC, useState, useEffect } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { Icon, Progress } from "semantic-ui-react";
import { useDismissToast } from "../../store/NotificationStore/NotificationHooks";

type Props = {
  notification: AppNotification;
};

export const NotificationItem: FC<Props> = ({ notification }) => {
  const dismissToast = useDismissToast();
  const [fadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, notification.durationSeconds * 1000 - 500);
    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, []);

  const { colors } = useTheme();

  function colorFromSeverity(severity: NotificationSeverity) {
    switch (severity) {
      case "info":
        return colors.PRIMARY_90_PERCENT;
      case "error":
        return colors.ERROR_90;
      case "success":
        return colors.SUCCESS_90;
      case "warning":
        return colors.WARNING_90;
    }
  }

  const className = fadingOut
    ? "notification-item fade-out"
    : "notification-item";

  return (
    <>
      <div className={className}>
        {notification.title && (
          <div className="toast-title">
            {notification.title}
            <span
              className="toast-close-btn"
              onClick={() => dismissToast(notification.id)}
            >
              <Icon name="close" />
            </span>
          </div>
        )}
        <div className="noti-msg">{notification.message}</div>
      </div>
      <style jsx>{`
        .notification-item {
          position: relative;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
          color: #222;
          display: inline-block;
          border-radius: 0.25rem;
          opacity: 1;
          transition: opacity 0.5s;
          display: flex;
          flex-direction: column;
          margin-top: 12px;
          min-width: 200px;
          opacity: 0;
          animation-name: fadeIn;
          animation-duration: 1s;
          animation-fill-mode: forwards;
          overflow: hidden;
          padding-bottom: 5px;
        }

        .noti-progress {
          position: absolute;
          bottom: -20px;
          left: -5px;
          right: -5px;
        }

        .toast-title {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          font-weight: 400;
          color: ${colorFromSeverity(notification.severity)};
        }

        .toast-close-btn {
          color: #6c757d;
          cursor: pointer;
          transition: color 0.2s;
        }

        .toast-close-btn:hover {
          color: #222;
        }

        .noti-msg {
          padding: 8px 12px;
          white-space: pre-wrap;
        }

        .fade-out {
          opacity: 0;
          transform: scale(1, 0);
        }

        .noti-msg p {
          margin: 0;
          padding: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
