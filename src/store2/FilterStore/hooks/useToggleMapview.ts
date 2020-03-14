import { useCallback } from "react";
import { useNadeFilterState } from "../context";
export const useToggleMapview = () => {
  const { dispatch, state } = useNadeFilterState();

  const { positionModalOpen } = state;
  const toggleMapViewVisibility = useCallback(() => {
    dispatch({
      type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL",
    });
  }, [dispatch]);
  return {
    mapViewVisisble: positionModalOpen,
    toggleMapViewVisibility,
  };
};
