import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { NotificationReducer } from "./NotificationStore/NotificationReducer";
import { NadeReducer } from "./NadeStore/NadeReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  notification: NotificationReducer,
  nadeStore: NadeReducer
});

function createMiddleware() {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return applyMiddleware(thunk);
  } else {
    return composeWithDevTools(applyMiddleware(thunk));
  }
}

export type AppState = ReturnType<typeof rootReducer>;

export const initReduxStore = (initialState: AppState) => {
  let store: any;
  const isClient = typeof window !== "undefined";

  if (isClient) {
    const { persistReducer } = require("redux-persist");

    const storage = require("redux-persist/lib/storage").default;

    // Mark some reducer as persisted on client
    const rootReducerClient = combineReducers({
      auth: persistReducer({ key: "auth", storage }, AuthReducer),
      notification: NotificationReducer,
      nadeStore: NadeReducer
    });

    store = createStore(rootReducerClient, initialState, createMiddleware());

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, initialState, createMiddleware());
  }
  return store;
};
