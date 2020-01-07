import { Reducer } from "redux";
import { NotificationActions, AppNotification } from "./NotificationActions";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { assertNever } from "../../utils/Common";

export type ToolTips = {
  seenFavoriteTip: boolean;
};

export const initialTooltips: ToolTips = {
  seenFavoriteTip: false
};

export type ToolTipKeys = keyof typeof initialTooltips;

export type NotificationState = {
  notifications: AppNotification[];
  seenFavoriteTip: boolean;
};

const initialState: NotificationState = {
  notifications: [],
  ...initialTooltips
};

export const NotificationReducer: Reducer<
  NotificationState,
  NotificationActions
> = (state = initialState, action): NotificationState => {
  switch (action.type) {
    case "@@notification/ADD":
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      };
    case "@@notification/REMOVE":
      const removed = state.notifications.filter(n => n.id !== action.id);
      return {
        ...state,
        notifications: removed
      };
    case "@@notification/SEEN_TOOL_TIP":
      return {
        ...state,
        [action.toolTip]: true
      };
    default:
      assertNever(action);
      return state;
  }
};

const persistConfig: PersistConfig<NotificationState> = {
  key: "notificationReducer",
  storage,
  whitelist: ["seenFavoriteTip"]
};

export const PersistedNotificationReducer = persistReducer(
  persistConfig,
  NotificationReducer
);
