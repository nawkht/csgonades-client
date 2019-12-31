import {
  useReduxDispatch,
  ReduxThunkAction
} from "../StoreUtils/ThunkActionType";
import { FavoriteApi } from "../../api/FavoriteApi";
import {
  addAllFavoritesAction,
  addFavoriteAction,
  removeFavoriteAction,
  addFavoritedNadesAction,
  startLoadingFavoritedNadesAction,
  stopLoadingFavoritedNades
} from "./FavoriteActions";
import { useSelector } from "react-redux";
import { allFavoritesSelector } from "./FavoriteSelectors";
import { Favorite } from "../../models/Favorite";
import { NadeApi } from "../../api/NadeApi";

export const useFetchFavorites = () => {
  const reduxDispatch = useReduxDispatch();
  return () => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const token = getState().auth.token;

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
    reduxDispatch(thunk);
  };
};

export const useAddFavorite = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const token = getState().auth.token;

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
    reduxDispatch(thunk);
  };
};

export const useUnfavorite = () => {
  const reduxDispatch = useReduxDispatch();
  return (favoriteId: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const token = getState().auth.token;

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
    reduxDispatch(thunk);
  };
};

export const useIsFavorited = (nadeId: string): Favorite | null => {
  const favories = useSelector(allFavoritesSelector);
  const result = favories.find(favorite => favorite.nadeId === nadeId);
  if (result) {
    return result;
  }
  return null;
};

export const useFetchFavoritedNades = () => {
  const reduxDispatch = useReduxDispatch();
  return () => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const token = getState().auth.token;

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

      dispatch(addFavoritedNadesAction(nades));
    };
    reduxDispatch(thunk);
  };
};
