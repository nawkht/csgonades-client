import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayToolTipThunk } from "../ToastStore/ToastThunks";
import { seenTipAction } from "./TipActions";
import { hasSeenTip } from "./TipSelectors";

export const useMapViewTip = () => {
  const dispatch = useDispatch();
  const hasOpenedMapView = useSelector(hasSeenTip("hasOpenedMapView"));

  const didOpenMapView = useCallback(() => {
    dispatch(seenTipAction("hasOpenedMapView"));
  }, [dispatch]);

  return {
    hasOpenedMapView,
    didOpenMapView,
  };
};

export const useShowFavoriteTip = () => {
  const dispatch = useDispatch();
  const seenFavoriteTip = useSelector(hasSeenTip("seenFavoriteTip"));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!seenFavoriteTip) {
        dispatch(displayToolTipThunk());
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, seenFavoriteTip]);
};
