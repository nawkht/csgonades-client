import { useCallback, useContext } from "react";
import { NadeFilterContext } from "../context";
export const useFilterByFavorites = () => {
  const { dispatch, state } = useContext(NadeFilterContext);
  const filterByFavorites = useCallback(() => {
    dispatch({ type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES" });
  }, [dispatch]);
  return {
    filterByFavorites,
    byFavorite: state.byFavorites,
  };
};
