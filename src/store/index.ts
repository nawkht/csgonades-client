import { createStore, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { AuthReducer } from "./AuthStore/AuthReducer";

const rootReducer = combineReducers({
  auth: AuthReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const initReduxStore = (initialState: AppState) => {
  let store;
  const isClient = typeof window !== "undefined";

  if (isClient) {
    const { persistReducer } = require("redux-persist");

    const storage = require("redux-persist/lib/storage").default;

    // Mark some reducer as persisted on client
    const rootReducerClient = combineReducers({
      auth: persistReducer({ key: "auth", storage }, AuthReducer)
    });

    store = createStore(rootReducerClient, initialState);
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, initialState);
  }
  return store;
};
