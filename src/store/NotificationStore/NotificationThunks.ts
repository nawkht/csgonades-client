import { NotificationApi } from "../../api/NotificationApi";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addUnreadNotificationsAction,
  markNotificationAsSeenAction
} from "./NotificationActions";

export const fetchNotifications = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      console.error("Missing token");
      return;
    }
    const res = await NotificationApi.getNotifications(authToken);

    if (res.isErr()) {
      console.error(res.error);
      return;
    }

    const notifications = res.value;

    if (notifications.length > 0) {
      dispatch(addUnreadNotificationsAction(notifications));
    }
  };
};

export const markNotifcationAsViewedThunk = (id: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      console.error("Missing token");
      return;
    }

    dispatch(markNotificationAsSeenAction(id));

    await NotificationApi.markAsViewed(id, authToken);
  };
};
