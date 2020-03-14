import { useCallback } from "react";
import { useNadeFilterState } from "../context";
export const useFilterByFavorites = () => {
  const { dispatch, state } = useNadeFilterState();

  const filterByFavorites = useCallback(() => {
    dispatch({ type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES" });
  }, [dispatch]);

  return {
    filterByFavorites,
    byFavorite: state.byFavorites,
  };
};
