import { ThunkAction } from "redux-thunk";
import { AppState } from "..";
import { ReduxDispatch } from "../StoreUtils/ThunkActionType";
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

const makeAddNotificationAction = (
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

const makeRemoveNotificationAction = (
  id: string
): RemoveNotificationAction => ({
  type: "@@nottication/remove",
  id
});

export const addNotificationAction = (
  appDispatch: ReduxDispatch<any>,
  notification: AppNotification
) => {
  const thunk: ThunkAction<
    any,
    AppState,
    any,
    NotificationActions
  > = async dispatch => {
    const addAction = makeAddNotificationAction(notification);
    const removeAction = makeRemoveNotificationAction(
      addAction.notification.id
    );
    dispatch(addAction);
    await notificationDeleteDelay(notification.durationSeconds);
    dispatch(removeAction);
  };
  appDispatch(thunk);
};

const notificationDeleteDelay = (seconds?: number) => {
  const time = seconds ? seconds * 1000 : 8 * 1000;
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};
