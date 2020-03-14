import { useCallback } from "react";
import { MapCoordinates } from "../../../models/Nade/Nade";
import { useNadeFilterState } from "../context";
export const useFilterByCoords = () => {
  const { dispatch } = useNadeFilterState();

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
