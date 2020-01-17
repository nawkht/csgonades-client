import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { removeNotificationAction, seenToolTip } from "./NotificationActions";
import {
  hasSeenFavoriteTipSelector,
  hasSeenTip
} from "./NotificationSelectors";
import { displayToolTipThunk } from "./NotificationThunks";

export const useTryShowFavoriteTooltip = () => {
  const dispatch = useDispatch();
  const seenFavoriteTip = useSelector(hasSeenFavoriteTipSelector);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!seenFavoriteTip) {
        dispatch(displayToolTipThunk());
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [seenFavoriteTip]);
};

export const useDismissToast = () => {
  const dispatch = useDispatch();

  return (id: string) => {
    dispatch(removeNotificationAction(id));
  };
};

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
        dispatch(seenToolTip("seenCoordinateTip"));
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
