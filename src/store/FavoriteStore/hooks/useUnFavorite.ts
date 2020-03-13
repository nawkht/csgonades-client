import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FavoriteApi } from "../../../api/FavoriteApi";
import { Nade } from "../../../models/Nade/Nade";
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
    async (favoriteId: string, _: Nade) => {
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
      console.warn("> Should reduce nade fav count");
    },
    [dispatch, getToken]
  );

  return unFavorite;
};
