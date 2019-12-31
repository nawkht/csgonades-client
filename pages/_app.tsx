import React from "react";
import App, { AppContext } from "next/app";
import withRedux from "next-redux-wrapper";
import { initReduxStore, AppState } from "../src/store";
import { Provider } from "react-redux";
import { Store } from "redux";
import "react-image-crop/dist/ReactCrop.css";
import { serverSideUserInitThunkAction } from "../src/store/AuthStore/AuthTunks";
import { AuthApi } from "../src/api/TokenApi";

type Props = {
  store: Store<AppState>;
};

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  async componentDidMount() {
    const { dispatch } = this.props.store;
    await AuthApi.setSessionCookie();

    // @ts-ignore
    await dispatch(serverSideUserInitThunkAction());
  }

  render() {
    const { Component, pageProps } = this.props;
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
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
          }
        `}</style>
      </Provider>
    );
  }
}

export default withRedux(initReduxStore)(MyApp);
