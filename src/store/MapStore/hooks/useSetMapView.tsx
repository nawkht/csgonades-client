import { useCallback } from "react";
import { useSelector } from "react-redux";
import { mapViewSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { MapView } from "../reducer";
import { useAnalytics } from "../../../utils/Analytics";

export const useSetMapView = () => {
  const { event } = useAnalytics();
  const mapView = useSelector(mapViewSelector);
  const dispatch = useMapStoreDispatch();

  const setMapView = useCallback(
    (view: MapView) => {
      dispatch({
        type: "MapStore/SetView",
        view,
      });
      event({
        category: "MapStore",
        action: "MapStore/SetView",
        label: view,
      });
    },
    [dispatch, event]
  );

  return {
    mapView,
    setMapView,
  };
};
