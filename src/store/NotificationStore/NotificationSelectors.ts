import { AppState } from "..";

export const notificationsSelector = (state: AppState) =>
  state.notificationStore.notifications;

export const lastNotificaitonFetch = (state: AppState) =>
  state.notificationStore.lastFetch;
