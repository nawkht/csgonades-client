import { FavoriteApi } from "../../api/FavoriteApi";
import { Nade } from "../../models/Nade/Nade";
import {
  onFavoriteNadeAction,
  onUnFavoriteNadeAction,
} from "../NadeStore/NadeActions";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addAllFavoritesAction,
  addFavoriteAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
  removeFavoriteAction,
} from "./FavoriteActions";

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

    const favorite = result.value;

    dispatch(addFavoriteAction(favorite));
    dispatch(favoriteInProgressEndAction());
    dispatch(onFavoriteNadeAction(nade));
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
    dispatch(onUnFavoriteNadeAction(nade));
  };
};
