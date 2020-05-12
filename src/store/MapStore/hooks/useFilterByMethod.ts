import { useCallback } from "react";
import { useSelector } from "react-redux";
import { filterByMethodSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { NadeSortingMethod } from "../reducer";

export const useFilterByMethod = () => {
  const byMethod = useSelector(filterByMethodSelector);
  const dispatch = useMapStoreDispatch();

  const filterBySortingMethod = useCallback(
    (sortingMethod: NadeSortingMethod) =>
      dispatch({
        type: "MapStore/SetSortingMethod",
        method: sortingMethod,
      }),
    [dispatch]
  );

  return {
    byMethod,
    filterBySortingMethod,
  };
};
