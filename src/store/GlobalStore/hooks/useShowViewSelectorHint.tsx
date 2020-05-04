import { useSelector, useDispatch } from "react-redux";
import { showViewSelectorHintSelector } from "../GlobalSelectors";
import { useCallback } from "react";

export const useShowViewSelectorHint = () => {
  const dispatch = useDispatch();
  const shouldShowViewSelectorHint = useSelector(showViewSelectorHintSelector);

  const hideViewSelectorHint = useCallback(() => {
    dispatch({
      type: "@@global/HideViewSelectorHint",
    });
  }, [dispatch]);

  return {
    shouldShowViewSelectorHint,
    hideViewSelectorHint,
  };
};
