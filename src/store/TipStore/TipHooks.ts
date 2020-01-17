import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { displayToolTipThunk } from "../ToastStore/ToastThunks";
import { seenTipAction } from "./TipActions";
import { hasSeenTip } from "./TipSelectors";

export const useTryShowCoordTip = () => {
  const dispatch = useDispatch();
  const [displayCoordsTip, setDisplayCoordsTip] = useState(false);
  const hasSeen = useSelector(hasSeenTip("seenCoordinateTip"));

  function onCloseCoordsTip() {
    GoogleAnalytics.event("Tip", "Coords tip close");
    setDisplayCoordsTip(false);
  }

  useEffect(() => {
    const startShowTimer = setTimeout(() => {
      if (!hasSeen) {
        setDisplayCoordsTip(true);
        dispatch(seenTipAction("seenCoordinateTip"));
      }
    }, 1000);
    const stopShowTimer = setTimeout(() => {
      setDisplayCoordsTip(false);
    }, 10000);

    return () => {
      clearTimeout(startShowTimer);
      clearTimeout(stopShowTimer);
    };
  }, [hasSeen]);

  return { displayCoordsTip, onCloseCoordsTip };
};

export const useShowFavoriteTip = () => {
  const dispatch = useDispatch();
  const seenFavoriteTip = useSelector(hasSeenTip("seenFavoriteTip"));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!seenFavoriteTip) {
        dispatch(displayToolTipThunk());
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [seenFavoriteTip]);
};
