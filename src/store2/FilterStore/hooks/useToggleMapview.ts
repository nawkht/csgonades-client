import { useCallback, useContext } from "react";
import { NadeFilterContext } from "../context";
export const useToggleMapview = () => {
  const { dispatch, state } = useContext(NadeFilterContext);
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
