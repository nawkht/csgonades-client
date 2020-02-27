import withRedux from "next-redux-wrapper";
import App, { AppContext } from "next/app";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Provider } from "react-redux";
import "react-toggle/style.css";
import { Store } from "redux";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AuthApi } from "../api/TokenApi";
import { AppState, initReduxStore } from "../store";
import { serverSideUserInitThunkAction } from "../store/AuthStore/AuthTunks";

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
      // @ts-ignore
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
            overflow-y: scroll;
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            font-weight: 400;
          }
        `}</style>
      </Provider>
    );
  }
}

export default withRedux(initReduxStore)(MyApp);
