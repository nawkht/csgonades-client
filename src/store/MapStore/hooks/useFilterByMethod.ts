import { useCallback } from "react";
import { useSelector } from "react-redux";
import { filterByMethodSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { NadeSortingMethod } from "../reducer";
import { useAnalytics } from "../../../utils/Analytics";

export const useFilterByMethod = () => {
  const byMethod = useSelector(filterByMethodSelector);
  const dispatch = useMapStoreDispatch();
  const { event } = useAnalytics();

  const filterBySortingMethod = useCallback(
    (sortingMethod: NadeSortingMethod) => {
      dispatch({
        type: "MapStore/SetSortingMethod",
        method: sortingMethod,
      });
      event({
        category: "Nade Sort",
        action: sortingMethod,
      });
    },
    [dispatch, event]
  );

  return {
    byMethod,
    filterBySortingMethod,
  };
};
