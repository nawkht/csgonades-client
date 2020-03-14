import { useCallback } from "react";
import { NadeType } from "../../../models/Nade/NadeType";
import { useNadeFilterState } from "../context";

export const useFilterByType = () => {
  const { dispatch, state } = useNadeFilterState();

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      dispatch({
        type: "@@nadefilter/FILTER_BY_TYPE",
        payload: nadeType,
      });
    },
    [dispatch]
  );
  return {
    byType: state.byType,
    filterByType,
  };
};
