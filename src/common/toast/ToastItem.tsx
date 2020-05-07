import { FC, useEffect, useState, memo } from "react";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { AppToast, ToastSeverity } from "../../store/ToastStore/ToastActions";
import { useDismissToast } from "../../store/ToastStore/ToastHooks";

type Props = {
  notification: AppToast;
};

export const ToastItem: FC<Props> = memo(({ notification }) => {
  const { colors } = useTheme();
  const dismissToast = useDismissToast();
  const [fadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, notification.durationSeconds * 1000 - 500);
    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [notification]);

  function colorFromSeverity(severity: ToastSeverity) {
    switch (severity) {
      case "info":
        return colors.PRIMARY;
      case "error":
        return colors.ERROR;
      case "success":
        return colors.SUCCESS;
      case "warning":
        return colors.WARNING;
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
              <FaTimes />
            </span>
          </div>
        )}
        <div className="noti-msg">{notification.message}</div>
      </div>
      <style jsx>{`
        .notification-item {
          position: relative;
          background: ${colors.DP02};
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
          color: ${colors.TEXT};
          display: inline-block;
          border-radius: 5px;
          opacity: 1;
          transition: opacity 0.15s;
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          width: 250px;
          opacity: 0;
          animation-name: fadeIn;
          animation-duration: 1s;
          animation-fill-mode: forwards;
          overflow: hidden;
          padding-bottom: 5px;
        }

        .toast-title {
          background: ${colors.DP01};
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
});
