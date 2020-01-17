import withRedux from "next-redux-wrapper";
import App, { AppContext } from "next/app";
import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AuthApi } from "../src/api/TokenApi";
import { AppState, initReduxStore } from "../src/store";
import { serverSideUserInitThunkAction } from "../src/store/AuthStore/AuthTunks";

type Props = {
  store: Store<AppState>;
};

class MyApp extends App<Props> {
  private persistor: Persistor;

  constructor(props: any) {
    super(props);
    this.persistor = persistStore(props.store);
  }

  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    const { store, req } = ctx;

    const isServer = typeof window === "undefined";

    if (isServer) {
      await store.dispatch(serverSideUserInitThunkAction(req?.headers.cookie));
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  async componentDidMount() {
    await AuthApi.setSessionCookie();
  }

  render() {
    const { Component, pageProps } = this.props;
    const { store } = this.props;

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Component {...pageProps} />}
          persistor={this.persistor}
        >
          <Component {...pageProps} />
        </PersistGate>
        <style global jsx>{`
          html {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            -webkit-box-sizing: inherit;
            -moz-box-sizing: inherit;
            box-sizing: inherit;
          }

          body {
            font-family: "Roboto", sans-serif;
            font-weight: 300;
            color: #212529;
          }
        `}</style>
      </Provider>
    );
  }
}

export default withRedux(initReduxStore)(MyApp);
