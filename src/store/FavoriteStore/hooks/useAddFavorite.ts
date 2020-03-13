import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FavoriteApi } from "../../../api/FavoriteApi";
import { Nade } from "../../../models/Nade/Nade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import {
  addFavoriteAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
} from "../FavoriteActions";

export const useAddFavorite = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const addFavorite = useCallback(
    async (nade: Nade) => {
      dispatch(favoriteInProgressBeginAction());

      const token = await getToken();

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
      console.log("> Should increase favorite count");
    },
    [dispatch, getToken]
  );

  return addFavorite;
};
