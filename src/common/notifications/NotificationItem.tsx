import { FC, memo } from "react";
import { FaBell } from "react-icons/fa";
import { Notification } from "../../models/Notification";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { pluralize } from "../../utils/Common";
import { prettyDateTime } from "../../utils/DateUtils";
import { PageLink } from "../PageLink";

type Props = {
  notification: Notification;
};

export const NotificationItem: FC<Props> = memo(({ notification }) => {
  const { colors } = useTheme();

  if (notification.type === "contact-msg") {
    return (
      <>
        <div className={"notification"}>
          <div className="noti-msg">
            <FaBell /> {notificationMessage(notification)}
          </div>
          <div className="noti-date">
            {prettyDateTime(notification.createdAt)}
          </div>
        </div>
        <style jsx>{`
          .notification {
            white-space: nowrap;
            border: 1px solid ${colors.BORDER};
            padding: 10px 15px;
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
              background-color: ${colors.HIGHLIGHT_BG};
            }
            90% {
              background-color: ${colors.HIGHLIGHT_BG};
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
      <PageLink
        href={`/nades/[nade]`}
        as={`/nades/${notification.nadeSlug || notification.nadeId}`}
      >
        <span className={"notification"}>
          <div className="noti-msg">{notificationMessage(notification)}</div>
          <div className="noti-date">
            {prettyDateTime(notification.createdAt)}
          </div>
          <div className="noti-divider"></div>
        </span>
      </PageLink>
      <style jsx>{`
        .noti-divider {
          height: 1px;
          background: ${colors.BORDER};
          margin-left: -30px;
          margin-right: -30px;
        }

        .notification {
          color: ${colors.TEXT};
          white-space: nowrap;
          padding: 15px 30px;
          color: black;
          display: block;
        }

        .noti-msg {
          color: ${colors.TEXT};
          display: flex;
        }

        .noti-date {
          font-size: 0.8em;
          margin-top: 4px;
          text-align: right;
          color: ${colors.TEXT};
        }

        .notification:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }
      `}</style>
    </>
  );
});

function notificationMessage(
  notification: Notification
): JSX.Element | undefined {
  switch (notification.type) {
    case "accepted-nade":
      return <div>Your nade was accepted!</div>;
    case "contact-msg":
      return <div>New contact message.</div>;
    case "declined-nade":
      return <div>Your nade was declined.</div>;
    case "favorite-agregate":
      const favCount = notification.count;
      if (favCount === 1) {
        return (
          <div>
            Your nade was favorited by
            <br />
            {notification.byNickname}.
          </div>
        );
      } else {
        return (
          <div>
            Your nade was favorited by
            <br />
            {notification.byNickname} and {pluralize(favCount - 1, "other")}.
          </div>
        );
      }
    case "new-nade":
      return <div>New nade!</div>;
    default:
      break;
  }
}
