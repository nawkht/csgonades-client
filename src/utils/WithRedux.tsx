import { NextPage } from "next";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AppState, initReduxStore } from "../store";

type Props = {
  initialReduxState: AppState;
};

export const withRedux = (PageComponent: NextPage, { ssr = true } = {}) => {
  const WithRedux: NextPage<Props> = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<PageComponent {...props} />}
        >
          <PageComponent {...props} />
        </PersistGate>
      </Provider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    console.log("> With redux running getInitProps");
    WithRedux.getInitialProps = async context => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrInitializeStore();

      // Provide the store to getInitialProps of pages
      // @ts-ignore
      context.reduxStore = reduxStore;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === "function"
          ? await PageComponent.getInitialProps(context)
          : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState(),
      };
    };
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
