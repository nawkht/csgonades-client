import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FavoriteApi } from "../../../api/FavoriteApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import {
  addAllFavoritesAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
  removeFavoriteAction,
} from "../FavoriteActions";

export const useUnfavorite = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const unFavorite = useCallback(
    async (favoriteId: string) => {
      dispatch(favoriteInProgressBeginAction());

      const token = await getToken();

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
    },
    [dispatch, getToken]
  );

  return unFavorite;
};
