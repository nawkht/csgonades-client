import React from "react";
import App, { AppContext } from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { initReduxStore } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    //@ts-ignore
    const store = this.props.store as any;

    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Head>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,700,900"
              rel="stylesheet"
              key="google-font-roboto"
            />

            <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
            />
          </Head>

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
        </PersistGate>
      </Provider>
    );
  }
}

export default withRedux(initReduxStore)(MyApp);
