import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { AdminReducer } from "./AdminStore/AdminReducer";
import { tokenRefreshMiddleware } from "./AuthStore/AuthMiddleware";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { GlobalReducer } from "./GlobalStore/GlobalReducer";
import { LayoutReducer } from "./LayoutStore/LayoutReducer";
import { NadeReducer } from "./NadeStore/NadeReducer";
import { NewNadeReducer } from "./NewNadeStore/NewNadeReducer";
import { PersistedNotificationReducer } from "./NotificationStore/NotificationReducer";
import { TournamentReducer } from "./TournamentStore/TournamentReducer";
import { UsersReducer } from "./UsersStore/UsersReducer";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  notificationStore: PersistedNotificationReducer,
  nadeStore: NadeReducer,
  favoriteStore: FavoriteReducer,
  layoutStore: LayoutReducer,
  usersStore: UsersReducer,
  adminStore: AdminReducer,
  globalStore: GlobalReducer,
  tournamentStore: TournamentReducer,
  newNadeStore: NewNadeReducer
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
