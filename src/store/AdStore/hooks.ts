import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AdActions } from "./actions";
import { useCallback, useEffect } from "react";
import Router from "next/router";
import {
  adSlotsToRefreshSelector,
  adSlotsToDisplaySelector,
} from "./selectors";

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
  const adSlotsToDisplay = useSelector(adSlotsToDisplaySelector);
  const adSlotsToRefresh = useSelector(adSlotsToRefreshSelector);
  const dispatch = useAdStoreDispatch();

  useEffect(() => {
    function clearPlaceholders() {
      dispatch({
        type: "Ads/BeforeNavigationChange",
      });
    }

    Router.events.on("routeChangeStart", clearPlaceholders);

    return () => Router.events.off("routeChangeStart", clearPlaceholders);
  }, [dispatch]);

  useEffect(() => {
    enableEzoicIfNotDone();
    const delay = setTimeout(() => {
      if (adSlotsToDisplay.length) {
        firstRenderAds(adSlotsToDisplay);
      } else if (adSlotsToRefresh.length) {
        refreshAds(adSlotsToRefresh);
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [adSlotsToDisplay, adSlotsToRefresh]);
};

function enableEzoicIfNotDone() {
  try {
    if (!ezstandalone.enabled) {
      ezstandalone.enable();
      console.log("> enabled ez");
    }
  } catch (error) {
    // no-op
  }
}

function firstRenderAds(slots: number[]) {
  try {
    ezstandalone.loadMore(slots);
    console.log("> Loaded more", slots);
  } catch (error) {
    // no-op
  }
}

function refreshAds(slots: number[]) {
  try {
    ezstandalone.define(slots);
    ezstandalone.refresh();
    console.log("> refreshed", slots);
  } catch (error) {
    // no-op
  }
}
