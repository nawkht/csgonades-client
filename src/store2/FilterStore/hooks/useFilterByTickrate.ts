import { useCallback, useContext } from "react";
import { NadeFilterContext } from "../context";

export const useFilterByTickrate = () => {
  const { dispatch, state } = useContext(NadeFilterContext);
  const filterByTickrate64 = useCallback(() => {
    dispatch({ type: "@@nadefilter/CLICK_TICKRATE_64" });
  }, [dispatch]);
  const filterByTickrate128 = useCallback(() => {
    dispatch({ type: "@@nadefilter/CLICK_TICKRATE_128" });
  }, [dispatch]);
  return {
    byTickrate: state.byTickrate,
    filterByTickrate64,
    filterByTickrate128,
  };
};
