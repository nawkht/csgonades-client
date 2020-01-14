import { AppState } from "..";
import { ToolTipKeys } from "./NotificationReducer";

export const notificationSelector = (state: AppState) => {
  return state.notificationStore.notifications;
};

export const hasSeenFavoriteTipSelector = (state: AppState) => {
  return state.notificationStore.seenFavoriteTip;
};

export const hasSeenTip = (toolTip: ToolTipKeys) => {
  return (state: AppState) => state.notificationStore[toolTip];
};
