import { useCallback } from "react";
import { useSelector } from "react-redux";
import { mapViewSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { MapView } from "../reducer";

export const useSetMapView = () => {
  const mapView = useSelector(mapViewSelector);
  const dispatch = useMapStoreDispatch();

  const setMapView = useCallback(
    (view: MapView) => dispatch({ type: "MapStore/SetView", view }),
    [dispatch]
  );
  return {
    mapView,
    setMapView,
  };
};
