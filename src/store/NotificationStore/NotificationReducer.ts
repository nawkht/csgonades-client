import { Reducer } from "redux";
import { Notification } from "../../models/Notification";
import { NotificationActions } from "./NotificationActions";

type NotificationState = {
  notifications: Notification[];
  loading: boolean;
};

const INITIAL_STATE: NotificationState = {
  notifications: [],
  loading: false
};

export const NotificationReducer: Reducer<
  NotificationState,
  NotificationActions
> = (state = INITIAL_STATE, action): NotificationState => {
  switch (action.type) {
    case "@@notification/ADD_UNREAD":
      return {
        ...state,
        notifications: action.notifications
      };
    case "@@notification/MARK_SEEN":
      const notifications: Notification[] = state.notifications.map(n => {
        const tmp = { ...n };
        if (n.id === action.notificationId) {
          tmp.hasBeenViewed = true;
        }
        return tmp;
      });
      return {
        ...state,
        notifications
      };
    default:
      return state;
  }
};
