import { Notification } from "../../models/Notification";

type AddUnreadNotificationsAction = {
  type: "@@notification/ADD_UNREAD";
  notifications: Notification[];
};

type MarkAsSeenNotificationAction = {
  type: "@@notification/MARK_SEEN";
  notificationId: string;
};

export const addUnreadNotificationsAction = (
  notifications: Notification[]
): AddUnreadNotificationsAction => ({
  type: "@@notification/ADD_UNREAD",
  notifications,
});

export const markNotificationAsSeenAction = (
  notificationId: string
): MarkAsSeenNotificationAction => ({
  type: "@@notification/MARK_SEEN",
  notificationId,
});

export type NotificationActions =
  | AddUnreadNotificationsAction
  | MarkAsSeenNotificationAction;
