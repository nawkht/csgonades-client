import { Reducer } from "redux";
import { Notification } from "../../models/Notification";
import { NotificationActions } from "./NotificationActions";

type NotificationState = {
  notifications: Notification[];
  loading: boolean;
  lastFetch?: Date;
};

const INITIAL_STATE: NotificationState = {
  notifications: [],
  loading: false,
};

export const NotificationReducer: Reducer<
  NotificationState,
  NotificationActions
> = (state = INITIAL_STATE, action): NotificationState => {
  switch (action.type) {
    case "@@notification/ADD_UNREAD":
      return {
        ...state,
        notifications: action.notifications,
        lastFetch: new Date(),
      };
    case "@@notification/MARK_SEEN":
      const updatedNotifications: Notification[] = state.notifications.map(
        (noti) => {
          if (noti.id === action.notificationId) {
            return {
              ...noti,
              viewed: true,
            };
          }
          return noti;
        }
      );
      return {
        ...state,
        notifications: updatedNotifications,
      };
    default:
      return state;
  }
};
