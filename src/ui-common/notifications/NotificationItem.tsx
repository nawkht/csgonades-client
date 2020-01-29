import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { Notification } from "../../models/Notification";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { assertNever } from "../../utils/Common";
import { prettyDate } from "../../utils/DateUtils";

type Props = {
  notification: Notification;
};

export const NotificationItem: FC<Props> = ({ notification }) => {
  const [wasViewed] = useState(notification.viewed);
  const { markNotificationAsViewed } = useNotifications();
  const { colors } = useTheme();

  useEffect(() => {
    const viewedTimer = setTimeout(() => {
      markNotificationAsViewed(notification.id);
    }, 1000);
    return () => {
      clearTimeout(viewedTimer);
    };
  }, []);

  function renderNotification(noti: Notification) {
    switch (noti.type) {
      case "favorite":
        return (
          <Link href={`/nades?id=${noti.nadeId}`} as={`/nades/${noti.nadeId}`}>
            <a className={wasViewed ? "notification" : "notification new"}>
              <div className="noti-msg">
                <Icon name="bell" /> Your nade was favorited {noti.count} times.
              </div>
              <div className="noti-date">
                {prettyDate(notification.createdAt)}
              </div>
            </a>
          </Link>
        );
      case "accepted-nade":
        return (
          <Link href={`/nades?id=${noti.nadeId}`} as={`/nades/${noti.nadeId}`}>
            <a className={wasViewed ? "notification" : "notification new"}>
              <div className="noti-msg">
                <Icon name="bell" /> Your nade was accepted!
              </div>
              <div className="noti-date">
                {prettyDate(notification.createdAt)}
              </div>
            </a>
          </Link>
        );
      case "contact-msg":
        return (
          <div className={wasViewed ? "notification" : "notification new"}>
            <div className="noti-msg">
              <Icon name="bell" /> Someone submitted a contact message.
            </div>
            <div className="noti-date">
              {prettyDate(notification.createdAt)}
            </div>
          </div>
        );
      case "declined-nade":
        return (
          <Link href={`/nades?id=${noti.nadeId}`} as={`/nades/${noti.nadeId}`}>
            <a className={wasViewed ? "notification" : "notification new"}>
              <div className="noti-msg">
                <Icon name="bell" /> Your nade was declined.
              </div>
              <div className="noti-date">
                {prettyDate(notification.createdAt)}
              </div>
            </a>
          </Link>
        );
      case "new-nade":
        return (
          <Link href={`/nades?id=${noti.nadeId}`} as={`/nades/${noti.nadeId}`}>
            <a className={wasViewed ? "notification" : "notification new"}>
              <div className="noti-msg">
                <Icon name="bell" /> New nade!
              </div>
              <div className="noti-date">
                {prettyDate(notification.createdAt)}
              </div>
            </a>
          </Link>
        );
      default:
        assertNever(noti);
    }
  }

  if (notification.type === "contact-msg") {
    return (
      <>
        <div className={wasViewed ? "notification" : "notification new"}>
          <div className="noti-msg">
            <Icon name="bell" /> {notificationMessage(notification)}
          </div>
          <div className="noti-date">{prettyDate(notification.createdAt)}</div>
        </div>
        <style jsx>{`
          .notification {
            white-space: nowrap;
            border: 1px solid ${colors.BORDER};
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
  }

  return (
    <>
      <Link
        href={`/nades?id=${notification.nadeId}`}
        as={`/nades/${notification.nadeId}`}
      >
        <a className={wasViewed ? "notification" : "notification new"}>
          <div className="noti-msg">
            <Icon name="bell" /> {notificationMessage(notification)}
          </div>
          <div className="noti-date">{prettyDate(notification.createdAt)}</div>
        </a>
      </Link>
      <style jsx>{`
        .notification {
          color: ${colors.TEXT};
          white-space: nowrap;
          border-bottom: 1px solid ${colors.BORDER};
          padding: 6px 12px;
          color: black;
        }

        .noti-msg {
          color: ${colors.TEXT};
        }

        .noti-date {
          font-size: 0.8em;
          margin-top: 4px;
          text-align: right;
          color: ${colors.TEXT};
        }

        .new {
          animation-name: indicateUnread;
          animation-duration: 4s;
        }

        .notification:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        @keyframes indicateUnread {
          0% {
            background-color: ${colors.UI_BG};
          }
          10% {
            background-color: rgb(232, 241, 255);
          }
          90% {
            background-color: rgb(232, 241, 255);
          }
          100% {
            background-color: ${colors.UI_BG};
          }
        }
      `}</style>
    </>
  );
};

function notificationMessage(notification: Notification) {
  switch (notification.type) {
    case "accepted-nade":
      return `Your nade was accepted!`;
    case "contact-msg":
      return "New contact message.";
    case "declined-nade":
      return "Your nade was declined";
    case "favorite":
      return `Your nade was favorited ${notification.count} times.`;
    case "new-nade":
      return "New nade!";
    default:
      break;
  }
}
