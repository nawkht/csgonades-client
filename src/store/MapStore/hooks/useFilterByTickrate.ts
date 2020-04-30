import { useCallback } from "react";
import { useSelector } from "react-redux";
import { filterByTickrateSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { Tickrate } from "../../../models/Nade/NadeTickrate";
import { useAnalytics } from "../../../utils/Analytics";

export const useFilterByTickrate = () => {
  const byTickrate = useSelector(filterByTickrateSelector);
  const dispatch = useMapStoreDispatch();
  const { event } = useAnalytics();

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      dispatch({
        type: "MapStore/FilterByTickrate",
        tick,
      });
      event({
        category: "MapStore",
        action: "MapStore/FilterByTickrate",
        label: tick,
      });
    },
    [dispatch, event]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};
