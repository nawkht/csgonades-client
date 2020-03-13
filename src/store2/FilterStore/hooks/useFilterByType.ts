import { useCallback, useContext } from "react";
import { NadeType } from "../../../models/Nade/NadeType";
import { NadeFilterContext } from "../context";

export const useFilterByType = () => {
  const { state, dispatch } = useContext(NadeFilterContext);
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
