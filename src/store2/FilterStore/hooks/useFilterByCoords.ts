import { useCallback, useContext } from "react";
import { MapCoordinates } from "../../../models/Nade/Nade";
import { NadeFilterContext } from "../context";
export const useFilterByCoords = () => {
  const { dispatch } = useContext(NadeFilterContext);
  const filterByCoords = useCallback(
    (coords: MapCoordinates) => {
      dispatch({
        type: "@@nadefilter/FILTER_BY_MAP_COORDINATES",
        payload: coords,
      });
    },
    [dispatch]
  );
  return filterByCoords;
};
