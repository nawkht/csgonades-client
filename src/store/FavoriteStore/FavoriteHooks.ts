import { useDispatch, useSelector } from "react-redux";
import { Favorite } from "../../models/Favorite";
import { Nade } from "../../models/Nade/Nade";
import { allFavoritesSelector } from "./FavoriteSelectors";
import {
  addFavoriteThunkAction,
  addUnFavoriteThunkAction,
  fetchFavoritedNadesThunkAction
} from "./FavoriteThunks";

export const useAddFavorite = () => {
  const dispatch = useDispatch();
  return (nade: Nade) => {
    dispatch(addFavoriteThunkAction(nade));
  };
};

export const useUnfavorite = () => {
  const dispatch = useDispatch();
  return (favoriteId: string, nade: Nade) => {
    dispatch(addUnFavoriteThunkAction(favoriteId, nade));
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
  const dispatch = useDispatch();
  return () => dispatch(fetchFavoritedNadesThunkAction());
};
