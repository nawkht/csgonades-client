import {
  AppNotification,
  NotificationSeverity
} from "../../store/NotificationStore/NotificationActions";
import { FC } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

type Props = {
  notification: AppNotification;
};

export const NotificationItem: FC<Props> = ({ notification }) => {
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

  return (
    <>
      <div
        className="notification-item"
        style={{ background: colorFromSeverity(notification.severity) }}
      >
        {notification.message}
      </div>
      <style jsx>{`
        .notification-item {
          border-radius: 6px;
          padding: 12px;
          color: white;
        }
      `}</style>
    </>
  );
};
