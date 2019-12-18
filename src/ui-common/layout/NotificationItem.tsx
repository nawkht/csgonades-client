import {
  AppNotification,
  NotificationSeverity
} from "../../store/NotificationStore/NotificationActions";
import { FC } from "react";
import { Colors } from "../../../constants/colors";

type Props = {
  notification: AppNotification;
};

export const NotificationItem: FC<Props> = ({ notification }) => {
  function colorFromSeverity(severity: NotificationSeverity) {
    switch (severity) {
      case "info":
        return Colors.PRIMARY_90_PERCENT;
      case "error":
        return Colors.ERROR_90;
      case "success":
        return Colors.SUCCESS_90;
      case "warning":
        return Colors.WARNING_90;
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
