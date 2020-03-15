import { useCallback } from "react";
import { useSelector } from "react-redux";
import { mapViewOpenSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";

export const useToggleMapview = () => {
  const mapViewOpen = useSelector(mapViewOpenSelector);
  const dispatch = useMapStoreDispatch();

  const toggleMapViewVisibility = useCallback(
    () =>
      dispatch({
        type: "MapStore/ToggleMapView",
      }),
    [dispatch]
  );

  return {
    mapViewOpen,
    toggleMapViewVisibility,
  };
};
