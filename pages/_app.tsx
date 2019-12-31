import React from "react";
import App, { AppContext } from "next/app";
import withRedux from "next-redux-wrapper";
import { initReduxStore, AppState } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { AuthApi } from "../src/api/TokenApi";
import { setToken, setUser } from "../src/store/AuthStore/AuthActions";
import { UserApi } from "../src/api/UserApi";
import "react-image-crop/dist/ReactCrop.css";
import { Persistor } from "redux-persist";
import { FavoriteApi } from "../src/api/FavoriteApi";
import { addAllFavoritesAction } from "../src/store/FavoriteStore/FavoriteActions";

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
    const tokenResult = await AuthApi.refreshToken();

    if (tokenResult.isErr()) {
      return;
    }

    const token = tokenResult.value;

    dispatch(setToken(token));

    const [userResult, favoriteResult] = await Promise.all([
      UserApi.fetchSelf(token),
      FavoriteApi.getUserFavorites(token)
    ]);

    if (userResult.isOk()) {
      setUser(dispatch, userResult.value);
    }

    if (favoriteResult.isOk()) {
      dispatch(addAllFavoritesAction(favoriteResult.value));
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const { store } = this.props;
    //@ts-ignore
    const persistor = store.__PERSISTOR as Persistor;

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
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
