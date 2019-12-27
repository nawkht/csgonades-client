import React from "react";
import App, { AppContext } from "next/app";
import withRedux from "next-redux-wrapper";
import { initReduxStore, AppState } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { AuthApi } from "../src/api/TokenApi";
import {
  setToken,
  signOutUser,
  setUser
} from "../src/store/AuthStore/AuthActions";
import { UserApi } from "../src/api/UserApi";
import "react-image-crop/dist/ReactCrop.css";
import { Persistor } from "redux-persist";
import { GoogleAnalytics } from "../src/utils/GoogleAnalytics";
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
    const { store } = this.props;

    try {
      await AuthApi.setSessionCookie();
      const accessToken = await AuthApi.refreshToken();
      setToken(store.dispatch, accessToken);
      if (accessToken) {
        const user = await UserApi.fetchSelf(accessToken);
        const favoritesResult = await FavoriteApi.getUserFavorites(accessToken);

        if (favoritesResult.isOk()) {
          store.dispatch(addAllFavoritesAction(favoritesResult.value));
        }

        setUser(store.dispatch, user);
        GoogleAnalytics.setUserId(user.steamID);
      }
    } catch (error) {
      store.dispatch(signOutUser());
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
