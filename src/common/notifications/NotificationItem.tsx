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
        <div className={"notification"}>
          <div className="noti-img">{notificationImage(notification)}</div>
          <div className="noti-msg">{notificationMessage(notification)}</div>
          <div className="noti-date">
            {prettyDateTime(notification.createdAt)}
          </div>
        </div>
      </PageLink>
      <style jsx>{`
        .notification {
          color: ${colors.TEXT};
          white-space: nowrap;
          display: block;
          border-bottom: 1px solid ${colors.BORDER};
          display: grid;
          grid-template-columns: min-content 1fr 1fr;
          grid-template-rows: auto auto;
          grid-template-areas:
            "img msg msg"
            "img date .";
          width: 100%;
          padding: 15px;
        }

        .noti-img {
          grid-area: img;
        }

        .noti-msg {
          grid-area: msg;
          white-space: normal;
          padding-bottom: 10px;
        }

        .noti-date {
          grid-area: date;
          text-align: left;
        }

        .notification img {
          max-width: 100px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .noti-msg {
          color: ${colors.TEXT};
        }

        .noti-date {
          font-size: 0.8em;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
});

function notificationImage(
  notification: Notification
): JSX.Element | undefined {
  let url: string | undefined = undefined;

  if (
    notification.type === "favorite-agregate" ||
    notification.type === "accepted-nade" ||
    notification.type === "declined-nade"
  ) {
    url = notification.thumnailUrl;
  }

  if (!url) {
    return undefined;
  }

  return (
    <>
      <img src={url} />
      <style jsx>{`
        img {
          width: 50px;
          border-radius: 5px;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
}

function notificationMessage(notification: Notification): string {
  switch (notification.type) {
    case "accepted-nade":
      return "Your nade was accepted!";
    case "contact-msg":
      return "New contact message.";
    case "declined-nade":
      return "Your nade was declined.</div>";
    case "favorite-agregate":
      const favCount = notification.count;
      if (favCount === 1) {
        return `Your nade was favorited by ${notification.byNickname}.`;
      } else {
        return `Your nade was favorited by ${
          notification.byNickname
        } and ${pluralize(favCount - 1, "other")}.`;
      }
    case "new-nade":
      return "New nade!";
    case "new-comment":
      return `${notification.byNickname} commented on your nade.`;
    case "favorite":
      return "";
    default:
      return "";
  }
}
