import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Favorite } from "../../models/Favorite";
import { Nade } from "../../models/Nade/Nade";
import { allFavoritesSelector } from "./FavoriteSelectors";
import {
  addFavoriteThunkAction,
  addUnFavoriteThunkAction,
  fetchFavoritedNadesThunkAction,
} from "./FavoriteThunks";

export const useAddFavorite = () => {
  const dispatch = useDispatch();

  const addFavorite = useCallback(
    (nade: Nade) => {
      dispatch(addFavoriteThunkAction(nade));
    },
    [dispatch]
  );

  return addFavorite;
};

export const useUnfavorite = () => {
  const dispatch = useDispatch();

  const unFavorite = useCallback(
    (favoriteId: string, nade: Nade) => {
      dispatch(addUnFavoriteThunkAction(favoriteId, nade));
    },
    [dispatch]
  );

  return unFavorite;
};

export const useIsFavorited = (nadeId: string): Favorite | undefined => {
  const favories = useSelector(allFavoritesSelector);

  const result = useMemo(() => {
    return favories.find(favorite => favorite.nadeId === nadeId);
  }, [favories, nadeId]);

  return result;
};

export const useFetchFavoritedNades = () => {
  const dispatch = useDispatch();

  const fetchFavoritedNades = useCallback(() => {
    dispatch(fetchFavoritedNadesThunkAction());
  }, [dispatch]);

  return fetchFavoritedNades;
};
