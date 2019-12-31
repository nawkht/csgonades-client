import nanoId from "nanoid";

export type NotificationSeverity = "info" | "success" | "warning" | "error";

export type AppNotification = {
  id?: string;
  message: string;
  severity: NotificationSeverity;
  durationSeconds?: number;
};

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

type AddNotificationAction = {
  type: "@@notification/add";
  notification: NoUndefinedField<AppNotification>;
};

type RemoveNotificationAction = {
  type: "@@nottication/remove";
  id: string;
};

export type NotificationActions =
  | AddNotificationAction
  | RemoveNotificationAction;

export const addNotificationAction = (
  notification: AppNotification
): AddNotificationAction => {
  const id = nanoId();
  const noti: NoUndefinedField<AppNotification> = {
    ...notification,
    id,
    durationSeconds: notification.durationSeconds || 8
  };
  return {
    type: "@@notification/add",
    notification: noti
  };
};

export const removeNotificationAction = (
  id: string
): RemoveNotificationAction => ({
  type: "@@nottication/remove",
  id
});
