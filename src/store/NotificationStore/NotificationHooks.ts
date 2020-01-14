import { useDispatch, useSelector } from "react-redux";
import { displayToolTipThunk } from "./NotificationThunks";
import { useEffect, useState } from "react";
import { removeNotificationAction } from "./NotificationActions";
import {
  hasSeenFavoriteTipSelector,
  hasSeenTip
} from "./NotificationSelectors";
import { seenToolTip } from "./NotificationActions";

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
  }, []);

  return { displayCoordsTip, onCloseCoordsTip };
};
