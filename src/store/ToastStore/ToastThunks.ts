import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { seenTipAction } from "../TipStore/TipActions";
import {
  addNotificationAction,
  AppToastCreate,
  removeNotificationAction,
} from "./ToastActions";

export const addNotificationActionThunk = (
  notification: AppToastCreate
): ReduxThunkAction => {
  return async dispatch => {
    const addAction = addNotificationAction(notification);
    const removeAction = removeNotificationAction(addAction.notification.id);
    dispatch(addAction);
    await notificationDeleteDelay(notification.durationSeconds);
    dispatch(removeAction);
  };
};

export const displayToolTipThunk = (): ReduxThunkAction => {
  return async dispatch => {
    dispatch(
      addNotificationActionThunk({
        title: "Favorite nades",
        message:
          "Sign in and favorite some nades\nto find them quicker next time!",
        severity: "info",
        durationSeconds: 20,
      })
    );
    dispatch(seenTipAction("seenFavoriteTip"));
  };
};

const notificationDeleteDelay = (seconds?: number) => {
  const time = seconds ? seconds * 1000 : 8 * 1000;
  return new Promise(resolve => setTimeout(() => resolve(), time));
};
