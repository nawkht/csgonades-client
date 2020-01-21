import { FavoriteApi } from "../../api/FavoriteApi";
import { NadeApi } from "../../api/NadeApi";
import { Nade } from "../../models/Nade/Nade";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { fetchNadesByMapActionThunk } from "../NadeStore/NadeThunks";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addAllFavoritesAction,
  addFavoriteAction,
  addFavoritedNadesAction,
  removeFavoriteAction,
  startLoadingFavoritedNadesAction,
  stopLoadingFavoritedNades
} from "./FavoriteActions";

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

export const addFavoriteThunkAction = (nade: Nade): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;

    if (!token) {
      console.warn("Trying to fetch favorite when not signed in");
      return;
    }

    const result = await FavoriteApi.favorite(nade.id, token);

    if (result.isErr()) {
      console.warn("Error", result.error);
      return;
    }

    const favorites = result.value;

    GoogleAnalytics.event("Favorite", "Add favorite");

    dispatch(addFavoriteAction(favorites));

    // Allow cache to invalidate server side
    await delay(1);
    dispatch(fetchNadesByMapActionThunk(nade.map, true));
  };
};

export const addUnFavoriteThunkAction = (
  favoriteId: string,
  nade: Nade
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().authStore.token;

    if (!token) {
      console.warn("Trying to remove favorite when not signed in");
      return;
    }

    dispatch(removeFavoriteAction(favoriteId));

    GoogleAnalytics.event("Favorite", "Remove favorite");

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

    // Allow cache to invalidate server side
    await delay(1);
    dispatch(fetchNadesByMapActionThunk(nade.map, true));
  };
};

const delay = (seconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};
