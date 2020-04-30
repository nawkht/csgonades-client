import { useCallback } from "react";
import { NadeType } from "../../../models/Nade/NadeType";
import { useSelector } from "react-redux";
import { filterByTypeSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { useAnalytics } from "../../../utils/Analytics";

export const useFilterByType = () => {
  const byType = useSelector(filterByTypeSelector);
  const dispatch = useMapStoreDispatch();
  const { event } = useAnalytics();

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      dispatch({
        type: "MapStore/FilterByType",
        payload: nadeType,
      });
      event({
        category: "MapStore",
        action: "MapStore/FilterByType",
        label: nadeType,
      });
    },
    [dispatch, event]
  );

  return {
    byType,
    filterByType,
  };
};
