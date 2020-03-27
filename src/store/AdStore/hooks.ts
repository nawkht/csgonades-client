import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AdActions } from "./actions";
import { useCallback, useEffect } from "react";
import Router from "next/router";
import { adSlotsSelector } from "./selectors";
import { ezDisplayAds } from "../../layout/useAdRefresher";

const useAdStoreDispatch = () => {
  return useDispatch<Dispatch<AdActions>>();
};

export const useRegisterPlaceholder = () => {
  const dispatch = useAdStoreDispatch();

  const registerPlaceholder = useCallback(
    (slot: number) => {
      dispatch({
        type: "Ads/RegisterPlaceholder",
        slot,
      });
    },
    [dispatch]
  );

  return registerPlaceholder;
};

export const useAdSlotsHandler = () => {
  const adSlots = useSelector(adSlotsSelector);
  const dispatch = useAdStoreDispatch();

  useEffect(() => {
    function clearPlaceholders() {
      console.log("> Clearing ad slots");
      dispatch({
        type: "Ads/ClearAdSlots",
      });
    }

    Router.events.on("routeChangeStart", clearPlaceholders);

    return () => Router.events.off("routeChangeStart", clearPlaceholders);
  }, [dispatch]);

  useEffect(() => {
    if (adSlots.length) {
      ezDisplayAds(() => {
        // no-op
      });
    }
  }, [adSlots]);
};
