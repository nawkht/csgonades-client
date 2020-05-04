import { useSelector, useDispatch } from "react-redux";
import { showViewSelectorHintSelector } from "../GlobalSelectors";
import { useCallback } from "react";
import { useAnalytics } from "../../../utils/Analytics";

export const useShowViewSelectorHint = () => {
  const { event } = useAnalytics();
  const dispatch = useDispatch();
  const shouldShowViewSelectorHint = useSelector(showViewSelectorHintSelector);

  const hideViewSelectorHint = useCallback(() => {
    dispatch({
      type: "@@global/HideViewSelectorHint",
    });
    event({
      category: "Global",
      action: "@@global/HideViewSelectorHint",
    });
  }, [dispatch, event]);

  return {
    shouldShowViewSelectorHint,
    hideViewSelectorHint,
  };
};
