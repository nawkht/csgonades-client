import { AppState } from "..";

export const notificationsSelector = (state: AppState) =>
  state.notificationStore.notifications;
