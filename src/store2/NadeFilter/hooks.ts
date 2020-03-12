import { useCallback, useContext, useMemo } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { NadeFilterContext } from "./context";

export const useNewNadeFilter = () => {
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

  const replaceNades = useCallback(
    (nades: NadeLight[]) => {
      dispatch({
        type: "@@nadefilter/REPLACE_NADES",
        payload: nades,
      });
    },
    [dispatch]
  );

  const filteredNades = useMemo(() => {
    let unfilteredNades = [...state.nades];
    if (state.byType) {
      unfilteredNades = unfilteredNades.filter(n => n.type === state.byType);
    }
    return unfilteredNades;
  }, [state]);

  return {
    nades: filteredNades,
    byType: state.byType,
    filterByType,
    replaceNades,
  };
};
