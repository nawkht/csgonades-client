import { filterByProSelector } from "../selectors";
import { useSelector } from "react-redux";
import { useMapStoreDispatch } from "./helpers";
import { useAnalytics } from "../../../utils/Analytics";
import { useCallback } from "react";

export const useFilterByPro = () => {
  const byPro = useSelector(filterByProSelector);
  const dispatch = useMapStoreDispatch();
  const { event } = useAnalytics();

  const toggleFilterByPro = useCallback(() => {
    dispatch({
      type: "MapStore/FilterToggleByPro",
    });
    event({
      category: "MapStore",
      action: "MapStore/FilterToggleByPro",
    });
  }, [dispatch, event]);

  return {
    byPro,
    toggleFilterByPro,
  };
};
