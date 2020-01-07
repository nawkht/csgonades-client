import nanoId from "nanoid";
import { capitalize } from "../../utils/Common";
import { ToolTipKeys } from "./NotificationReducer";

export type NotificationSeverity = "info" | "success" | "warning" | "error";

export type AppNotificationCreate = {
  id?: string;
  title?: string;
  message: string;
  severity: NotificationSeverity;
  durationSeconds?: number;
};

export type AppNotification = {
  id: string;
  title?: string;
  message: string;
  severity: NotificationSeverity;
  durationSeconds: number;
};

type AddNotificationAction = {
  type: "@@notification/ADD";
  notification: AppNotification;
};

type RemoveNotificationAction = {
  type: "@@notification/REMOVE";
  id: string;
};

type SetSeenToolTipAction = {
  type: "@@notification/SEEN_TOOL_TIP";
  toolTip: ToolTipKeys;
};

export type NotificationActions =
  | AddNotificationAction
  | RemoveNotificationAction
  | SetSeenToolTipAction;

export const addNotificationAction = (
  notification: AppNotificationCreate
): AddNotificationAction => {
  const id = nanoId();
  const noti: AppNotification = {
    ...notification,
    id,
    durationSeconds: notification.durationSeconds || 8,
    title: notification.title || capitalize(notification.severity)
  };
  return {
    type: "@@notification/ADD",
    notification: noti
  };
};

export const removeNotificationAction = (
  id: string
): RemoveNotificationAction => ({
  type: "@@notification/REMOVE",
  id
});

export const seenToolTip = (toolTip: ToolTipKeys): SetSeenToolTipAction => ({
  type: "@@notification/SEEN_TOOL_TIP",
  toolTip
});
