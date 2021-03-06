import { useCallback } from "react";
import { useMapStoreDispatch } from "./helpers";
import { useSelector } from "react-redux";
import { filterByFavoritesSelector } from "../selectors";

export const useFilterByFavorites = () => {
  const byFavorites = useSelector(filterByFavoritesSelector);
  const dispatch = useMapStoreDispatch();

  const toggleFavFilter = () =>
    dispatch({ type: "MapStore/FilterToggleFavorites" });

  const filterByFavorites = useCallback(toggleFavFilter, [dispatch]);

  return {
    filterByFavorites,
    byFavorites,
  };
};
