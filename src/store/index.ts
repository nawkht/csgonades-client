import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { AdminReducer } from "./AdminStore/AdminReducer";
import { analyticsMiddleware } from "./Analytics/AnalyticsMiddleware";
import { tokenRefreshMiddleware } from "./AuthStore/AuthMiddleware";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { GlobalReducer } from "./GlobalStore/GlobalReducer";
import { NadeReducer } from "./NadeStore/NadeReducer";
import { NavigationReducer } from "./NavigationStore/NavigationReducer";
import { NewNadeReducer } from "./NewNadeStore/NewNadeReducer";
import { NotificationReducer } from "./NotificationStore/NotificationReducer";
import { PersistedSettingsReducer } from "./SettingsStore/SettingsReducer";
import { PersistedTipReducer } from "./TipStore/TipReducer";
import { ToastReducer } from "./ToastStore/ToastReducer";
import { TournamentReducer } from "./TournamentStore/TournamentReducer";
import { UsersReducer } from "./UsersStore/UsersReducer";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  toastStore: ToastReducer,
  nadeStore: NadeReducer,
  favoriteStore: FavoriteReducer,
  usersStore: UsersReducer,
  adminStore: AdminReducer,
  globalStore: GlobalReducer,
  tournamentStore: TournamentReducer,
  newNadeStore: NewNadeReducer,
  tipStore: PersistedTipReducer,
  notificationStore: NotificationReducer,
  settingsStore: PersistedSettingsReducer,
  navigationStore: NavigationReducer
});

function createMiddleware() {
  const isProduction = process.env.NODE_ENV === "production";

  const middleware = applyMiddleware(
    analyticsMiddleware,
    tokenRefreshMiddleware,
    thunk
  );

  if (isProduction) {
    return middleware;
  } else {
    return composeWithDevTools(middleware);
  }
}

export type AppState = ReturnType<typeof rootReducer>;

export const initReduxStore = (initialState: AppState) => {
  let store: any;
  const isClient = typeof window !== "undefined";

  if (isClient) {
    store = createStore(rootReducer, initialState, createMiddleware());
  } else {
    store = createStore(rootReducer, initialState, createMiddleware());
  }
  return store;
};
