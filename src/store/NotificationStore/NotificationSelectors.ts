import { AppState } from "..";

export const notificationSelector = (state: AppState) => {
  return state.notificationStore.notifications;
};

export const hasSeenFavoriteTipSelector = (state: AppState) => {
  return state.notificationStore.seenFavoriteTip;
};
