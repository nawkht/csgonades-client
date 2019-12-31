import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  AppNotification,
  addNotificationAction,
  removeNotificationAction
} from "./NotificationActions";

export const addNotificationActionThunk = (
  notification: AppNotification
): ReduxThunkAction => {
  return async dispatch => {
    const addAction = addNotificationAction(notification);
    const removeAction = removeNotificationAction(addAction.notification.id);
    dispatch(addAction);
    await notificationDeleteDelay(notification.durationSeconds);
    dispatch(removeAction);
  };
};

const notificationDeleteDelay = (seconds?: number) => {
  const time = seconds ? seconds * 1000 : 8 * 1000;
  return new Promise(resolve => setTimeout(() => resolve(), time));
};
