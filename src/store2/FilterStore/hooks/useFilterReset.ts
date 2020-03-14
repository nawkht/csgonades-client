import { useCallback, useMemo } from "react";
import { useNadeFilterState } from "../context";

export const useFilterReset = () => {
  const { dispatch, state } = useNadeFilterState();

  const resetFilter = useCallback(() => {
    dispatch({
      type: "@@nadefilter/RESET_NADE_FILTER",
    });
  }, [dispatch]);

  const canReset = useMemo(() => {
    if (state.byCoords) {
      return true;
    }
    if (state.byFavorites) {
      return true;
    }
    if (state.byTickrate !== "any") {
      return true;
    }
    if (state.byType) {
      return true;
    }
    return false;
  }, [state]);
  return {
    resetFilter,
    canReset,
  };
};
