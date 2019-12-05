import { Reducer } from "redux";
import { NotificationActions, AppNotification } from "./NotificationActions";

export type NotificationState = {
  notifications: AppNotification[];
};

const initialState: NotificationState = {
  notifications: []
};

export const NotificationReducer: Reducer<
  NotificationState,
  NotificationActions
> = (state = initialState, action): NotificationState => {
  switch (action.type) {
    case "@@notification/add":
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      };
    case "@@nottication/remove":
      return {
        ...state,
        notifications: state.notifications.filter(notifi => {
          notifi.id !== action.id;
        })
      };
    default:
      return state;
  }
};
