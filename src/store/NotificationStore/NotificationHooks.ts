import { useDispatch, useSelector } from "react-redux";
import { displayToolTipThunk } from "./NotificationThunks";
import { useEffect } from "react";
import { removeNotificationAction } from "./NotificationActions";
import { hasSeenFavoriteTipSelector } from "./NotificationSelectors";

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
