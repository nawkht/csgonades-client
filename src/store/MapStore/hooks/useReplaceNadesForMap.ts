import { useMapStoreDispatch } from "./helpers";
import { useCallback } from "react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";

export const useMapStoreActions = () => {
  const dispatch = useMapStoreDispatch();

  const setCurrentMap = useCallback(
    (map: CsgoMap) => dispatch({ type: "MapStore/SetCurrentMap", map }),
    [dispatch]
  );

  return {
    setCurrentMap,
  };
};
