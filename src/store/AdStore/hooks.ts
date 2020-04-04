import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AdActions } from "./actions";
import { useCallback, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { adSlotsSelector } from "./selectors";
import { useCookieConcent } from "../GlobalStore/GlobalHooks";

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
  const { asPath } = useRouter();
  const adSlots = useSelector(adSlotsSelector);
  const dispatch = useAdStoreDispatch();
  const { acceptedCookieConsent } = useCookieConcent();

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
    const delay = setTimeout(() => {
      if (
        !adSlots.length ||
        asPath.includes("adtesting") ||
        !acceptedCookieConsent
      ) {
        return;
      }
      onNewSlots(adSlots);
    }, 100);
    return () => clearTimeout(delay);
  }, [adSlots, asPath, acceptedCookieConsent]);
};

async function onNewSlots(slots: number[]) {
  try {
    const ezstandalone = (window.ezstandalone = window.ezstandalone || {});
    ezstandalone.cmd = ezstandalone.cmd || [];

    if (!ezstandalone.enabled) {
      ezstandalone.define(...slots);
      ezstandalone.enable();
      sleep(500);
      ezstandalone.display();
      console.log("> enable display", slots.toString());
    } else {
      ezstandalone.define(...slots);
      sleep(250);
      ezstandalone.refresh();
      console.log("> refresh", slots.toString());
    }
  } catch (error) {}
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
