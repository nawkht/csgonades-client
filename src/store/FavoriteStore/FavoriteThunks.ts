import { FavoriteApi } from "../../api/FavoriteApi";
import { NadeApi } from "../../api/NadeApi";
import { Nade } from "../../models/Nade/Nade";
import { fetchNadesByMapActionThunk } from "../NadeStore/NadeThunks";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addAllFavoritesAction,
  addFavoriteAction,
  addFavoritedNadesAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
  removeFavoriteAction,
  startLoadingFavoritedNadesAction,
  stopLoadingFavoritedNades,
} from "./FavoriteActions";

const delay = (seconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
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

export const addFavoriteThunkAction = (nade: Nade): ReduxThunkAction => {
  return async (dispatch, getState) => {
    dispatch(favoriteInProgressBeginAction());

    const state = getState();
    const token = state.authStore.token;

    if (!token) {
      console.warn("Trying to fetch favorite when not signed in");
      return dispatch(favoriteInProgressEndAction());
    }

    const result = await FavoriteApi.favorite(nade.id, token);

    if (result.isErr()) {
      return dispatch(favoriteInProgressEndAction());
    }

    const favorites = result.value;

    dispatch(addFavoriteAction(favorites));
    dispatch(favoriteInProgressEndAction());

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
    dispatch(favoriteInProgressBeginAction());
    const state = getState();
    const token = state.authStore.token;

    if (!token) {
      return dispatch(favoriteInProgressEndAction());
    }

    dispatch(removeFavoriteAction(favoriteId));

    const result = await FavoriteApi.unFavorite(favoriteId, token);
    if (result.isErr()) {
      return dispatch(favoriteInProgressEndAction());
    }

    const favoritesResult = await FavoriteApi.getUserFavorites(token);

    if (favoritesResult.isErr()) {
      return dispatch(favoriteInProgressEndAction());
    }

    const favorites = favoritesResult.value;

    dispatch(addAllFavoritesAction(favorites));
    dispatch(favoriteInProgressEndAction());

    // Allow cache to invalidate server side
    await delay(1);
    dispatch(fetchNadesByMapActionThunk(nade.map, true));
  };
};
