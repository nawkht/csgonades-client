import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { analyticsMiddleware } from "./Analytics/AnalyticsMiddleware";
import { tokenRefreshMiddleware } from "./AuthStore/AuthMiddleware";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { BlogReducer } from "./BlogStore/BlogReducer";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { GalleryReducer } from "./GalleryStore/GalleryReducer";
import { GlobalReducer } from "./GlobalStore/GlobalReducer";
import { NadeReducer } from "./NadeStore/NadeReducer";
import { NavigationReducer } from "./NavigationStore/NavigationReducer";
import { NewNadeReducer } from "./NewNadeStore/NewNadeReducer";
import { NotificationReducer } from "./NotificationStore/NotificationReducer";
import { PersistedSettingsReducer } from "./SettingsStore/SettingsReducer";
import { PersistedTipReducer } from "./TipStore/TipReducer";
import { ToastReducer } from "./ToastStore/ToastReducer";
import { UsersReducer } from "./UsersStore/UsersReducer";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  toastStore: ToastReducer,
  nadeStore: NadeReducer,
  favoriteStore: FavoriteReducer,
  usersStore: UsersReducer,
  globalStore: GlobalReducer,
  newNadeStore: NewNadeReducer,
  tipStore: PersistedTipReducer,
  notificationStore: NotificationReducer,
  settingsStore: PersistedSettingsReducer,
  navigationStore: NavigationReducer,
  blogStore: BlogReducer,
  galleryStore: GalleryReducer,
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

export const initReduxStore = (initialState: AppState): Store<AppState> => {
  let store: any;
  const isClient = typeof window !== "undefined";

  if (isClient) {
    store = createStore(rootReducer, initialState, createMiddleware());
  } else {
    store = createStore(rootReducer, initialState, createMiddleware());
  }
  return store;
};
