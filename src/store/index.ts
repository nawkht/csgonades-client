import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { tokenRefreshMiddleware } from "./AuthStore/AuthMiddleware";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { GlobalReducer } from "./GlobalStore/GlobalReducer";
import { NadeReducer } from "./NadeStore/NadeReducer";
import { NewNadeReducer } from "./NewNadeStore/NewNadeReducer";
import { NotificationReducer } from "./NotificationStore/NotificationReducer";
import { PersistedSettingsReducer } from "./SettingsStore/SettingsReducer";
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
  notificationStore: NotificationReducer,
  settingsStore: PersistedSettingsReducer,
});

function createMiddleware() {
  const isProduction = process.env.NODE_ENV === "production";

  const middleware = applyMiddleware(tokenRefreshMiddleware, thunk);

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
