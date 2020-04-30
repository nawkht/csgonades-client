import { useCallback } from "react";
import { useMapStoreDispatch } from "./helpers";
import { useSelector } from "react-redux";
import { filterByFavoritesSelector } from "../selectors";
import { useAnalytics } from "../../../utils/Analytics";

export const useFilterByFavorites = () => {
  const byFavorites = useSelector(filterByFavoritesSelector);
  const dispatch = useMapStoreDispatch();
  const { event } = useAnalytics();

  const filterByFavorites = useCallback(() => {
    dispatch({ type: "MapStore/FilterToggleFavorites" });
    event({
      category: "MapStore",
      action: "MapStore/FilterToggleFavorites",
    });
  }, [dispatch, event]);

  return {
    filterByFavorites,
    byFavorites,
  };
};
