import { NotificationApi } from "../../api/NotificationApi";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addUnreadNotificationsAction,
  markNotificationAsSeenAction,
} from "./NotificationActions";

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

export const fetchNotificationThunk = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      return;
    }

    const result = await NotificationApi.getNotifications(authToken);

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    console.log("> Fetched notifications");

    return dispatch(addUnreadNotificationsAction(result.value));
  };
};
