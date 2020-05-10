import { useCallback, useMemo } from "react";
import { useMapStoreDispatch } from "./helpers";
import { useSelector } from "react-redux";
import {
  filterByCoordsSelector,
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByProSelector,
} from "../selectors";

export const useFilterReset = () => {
  const byCoords = useSelector(filterByCoordsSelector);
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const byPro = useSelector(filterByProSelector);
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
    if (byPro) {
      return true;
    }
    return false;
  }, [byCoords, byTickrate, byFavorites, byType, byPro]);

  return {
    resetFilter,
    canReset,
  };
};
