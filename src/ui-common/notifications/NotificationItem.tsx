import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { Notification } from "../../models/Notification";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { prettyDate } from "../../utils/DateUtils";

type Props = {
  notification: Notification;
};

export const NotificationItem: FC<Props> = ({ notification }) => {
  const [wasViewed] = useState(notification.hasBeenViewed);
  const { markNotificationAsViewed } = useNotifications();
  const { colors } = useTheme();
  const msg = notificationMessage(notification);

  useEffect(() => {
    const viewedTimer = setTimeout(() => {
      markNotificationAsViewed(notification.id);
    }, 1000);
    return () => {
      clearTimeout(viewedTimer);
    };
  }, []);

  return (
    <>
      <Link
        href={`/nades?id=${notification.entityId}`}
        as={`/nades/${notification.entityId}`}
      >
        <a className={wasViewed ? "notification" : "notification new"}>
          <div className="noti-msg">
            <Icon name="bell" /> {msg}
          </div>
          <div className="noti-date">{prettyDate(notification.createdAt)}</div>
        </a>
      </Link>
      <style jsx>{`
        .notification {
          white-space: nowrap;
          border: 1px solid ${colors.PRIMARY_BORDER};
          padding: 6px;
          border-radius: 4px;
          margin-bottom: 6px;
          color: black;
        }

        .noti-date {
          font-size: 0.8em;
          margin-top: 4px;
          text-align: right;
        }

        .new {
          animation-name: indicateUnread;
          animation-duration: 4s;
        }

        .notification:last-child {
          margin-bottom: 0;
        }

        @keyframes indicateUnread {
          0% {
            background-color: white;
          }
          10% {
            background-color: rgb(232, 241, 255);
          }
          90% {
            background-color: rgb(232, 241, 255);
          }
          100% {
            background-color: white;
          }
        }
      `}</style>
    </>
  );
};

function notificationMessage(noti: Notification) {
  switch (noti.type) {
    case "accepted-nade":
      return "Your nade has been accepted!";
    case "declined-nade":
      return "Your nade was declined!";
    case "favorited-nade":
      return `Your nade was favorited ${noti.count} times.`;
    case "new-contact-msg":
      return "New contact message.";
    case "new-nade":
      return "New nade added.";
    case "new-report":
      return "New report added";
    default:
      console.warn("Unknown notification type");
      return "Unknown notification.";
  }
}
