import { createStore, combineReducers, applyMiddleware } from "redux";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { PersistedNotificationReducer } from "./NotificationStore/NotificationReducer";
import { NadeReducer } from "./NadeStore/NadeReducer";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { LayoutReducer } from "./LayoutStore/LayoutReducer";
import { UsersReducer } from "./UsersStore/UsersReducer";
import { tokenRefreshMiddleware } from "./AuthStore/AuthMiddleware";
import { AdminReducer } from "./AdminStore/AdminReducer";
import { GlobalReducer } from "./GlobalStore/GlobalReducer";
import { TournamentReducer } from "./TournamentStore/TournamentReducer";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  notificationStore: PersistedNotificationReducer,
  nadeStore: NadeReducer,
  favoriteStore: FavoriteReducer,
  layoutStore: LayoutReducer,
  usersStore: UsersReducer,
  adminStore: AdminReducer,
  globalStore: GlobalReducer,
  tournamentStore: TournamentReducer
});

function createMiddleware() {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return applyMiddleware(tokenRefreshMiddleware, thunk);
  } else {
    return composeWithDevTools(applyMiddleware(tokenRefreshMiddleware, thunk));
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
