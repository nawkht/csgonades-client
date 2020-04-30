import { useCallback, useMemo } from "react";
import { useMapStoreDispatch } from "./helpers";
import { useSelector } from "react-redux";
import {
  filterByCoordsSelector,
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
} from "../selectors";
import { useAnalytics } from "../../../utils/Analytics";

export const useDisplayingNadesForPosition = () => {
  const dispatch = useMapStoreDispatch();
  const byCoords = useSelector(filterByCoordsSelector);
  const { event } = useAnalytics();

  const reset = useCallback(() => {
    dispatch({
      type: "MapStore/FilterReset",
    });
    event({
      category: "MapStore",
      action: "MapStore/FilterReset",
    });
  }, [dispatch, event]);

  return {
    isDisplayingCoords: !!byCoords,
    reset,
  };
};

export const useFilterReset = () => {
  const byCoords = useSelector(filterByCoordsSelector);
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const dispatch = useMapStoreDispatch();

  const resetFilter = useCallback(() => {
    dispatch({
      type: "MapStore/FilterReset",
    });
  }, [dispatch]);

  const canReset = useMemo(() => {
    if (byCoords) {
      return true;
    }
    if (byFavorites) {
      return true;
    }
    if (byTickrate !== "any") {
      return true;
    }
    if (byType) {
      return true;
    }
    return false;
  }, [byCoords, byTickrate, byFavorites, byType]);

  return {
    resetFilter,
    canReset,
  };
};
