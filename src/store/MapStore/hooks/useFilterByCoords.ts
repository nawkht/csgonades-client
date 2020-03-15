import { useCallback } from "react";
import { MapCoordinates } from "../../../models/Nade/Nade";
import { useMapStoreDispatch } from "./helpers";
export const useFilterByCoords = () => {
  const dispatch = useMapStoreDispatch();

  const filterByCoords = useCallback(
    (coords: MapCoordinates) => {
      dispatch({
        type: "MapStore/FilterByCoordinates",
        payload: coords,
      });
    },
    [dispatch]
  );

  return filterByCoords;
};
