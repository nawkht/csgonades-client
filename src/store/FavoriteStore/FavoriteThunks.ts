import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { FavoriteApi } from "../../api/FavoriteApi";
import {
  addFavoriteAction,
  removeFavoriteAction,
  addAllFavoritesAction,
  startLoadingFavoritedNadesAction,
  stopLoadingFavoritedNades,
  addFavoritedNadesAction
} from "./FavoriteActions";
import { NadeApi } from "../../api/NadeApi";

export const fetchFavoritesThunkAction = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;

    if (!token) {
      console.warn("Trying to fetch favorite when not signed in");
      return;
    }

    const result = await FavoriteApi.getUserFavorites(token);

    if (result.isErr()) {
      console.warn("Error", result.error);
      return;
    }

    const favorites = result.value;

    dispatch(addAllFavoritesAction(favorites));
  };
};

export const fetchFavoritedNadesThunkAction = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;

    if (!token) {
      return;
    }

    dispatch(startLoadingFavoritedNadesAction());
    const favoritesResult = await FavoriteApi.getUserFavorites(token);

    if (favoritesResult.isErr()) {
      console.warn("Error", favoritesResult.error);
      return;
    }

    const favorites = favoritesResult.value;
    dispatch(addAllFavoritesAction(favorites));
    const nadeIds = favorites.map(favorite => favorite.nadeId);
    const nadesResult = await NadeApi.byNadeIdList(nadeIds);
    dispatch(stopLoadingFavoritedNades());

    if (nadesResult.isErr()) {
      console.error(nadesResult.error);
      return;
    }

    const nades = nadesResult.value;
    return dispatch(addFavoritedNadesAction(nades));
  };
};

export const addFavoriteThunkAction = (nadeId: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;

    if (!token) {
      console.warn("Trying to fetch favorite when not signed in");
      return;
    }

    const result = await FavoriteApi.favorite(nadeId, token);
    if (result.isErr()) {
      console.warn("Error", result.error);
      return;
    }

    const favorites = result.value;

    dispatch(addFavoriteAction(favorites));
  };
};

export const addUnFavoriteThunkAction = (
  favoriteId: string
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;

    if (!token) {
      console.warn("Trying to remove favorite when not signed in");
      return;
    }

    dispatch(removeFavoriteAction(favoriteId));

    const result = await FavoriteApi.unFavorite(favoriteId, token);
    if (result.isErr()) {
      console.warn("Error", result.error);
      return;
    }

    const favoritesResult = await FavoriteApi.getUserFavorites(token);

    if (favoritesResult.isErr()) {
      console.warn("Error", favoritesResult.error);
      return;
    }

    const favorites = favoritesResult.value;

    dispatch(addAllFavoritesAction(favorites));
  };
};
