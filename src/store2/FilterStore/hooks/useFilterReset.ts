import { useCallback, useContext, useMemo } from "react";
import { NadeFilterContext } from "../context";

export const useFilterReset = () => {
  const { state, dispatch } = useContext(NadeFilterContext);

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
