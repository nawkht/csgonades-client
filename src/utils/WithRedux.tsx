import { NextPage } from "next";
import React, { memo } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AppState, initReduxStore } from "../store";

type Props = {
  initialReduxState: AppState;
};

export const withRedux = (PageComponent: NextPage) => {
  const WithRedux: NextPage<Props> = memo(({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <PageComponent {...props} />
        </PersistGate>
      </Provider>
    );
  });

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  return WithRedux;
};

let reduxStore: Store<AppState>;

const getOrInitializeStore = (initialState?: AppState) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === "undefined") {
    return initReduxStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initReduxStore(initialState);
  }

  return reduxStore;
};
