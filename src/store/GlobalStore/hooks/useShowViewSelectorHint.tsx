import { useSelector } from "react-redux";
import { showViewSelectorHintSelector } from "../GlobalSelectors";
import { useCallback } from "react";
import { useGlobalDispatch } from "./helpers";

export const useShowViewSelectorHint = () => {
  const dispatch = useGlobalDispatch();
  const shouldShowViewSelectorHint = useSelector(showViewSelectorHintSelector);

  const hideViewSelectorHint = useCallback(() => {
    dispatch({
      type: "Global/HideViewSelectorHint",
    });
  }, [dispatch]);

  return {
    shouldShowViewSelectorHint,
    hideViewSelectorHint,
  };
};
