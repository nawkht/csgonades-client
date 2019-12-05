import { AppState } from "..";

export const notificationSelector = (state: AppState) => {
  return state.notification.notifications;
};
