import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useCookieConcent } from "../store/GlobalStore/GlobalHooks";

export const useNewAdRefresher = () => {
  const { acceptedCookieConsent } = useCookieConcent();
  const { route } = useRouter();

  useEffect(() => {
    if (route.includes("adtesting") || !acceptedCookieConsent) {
      console.log("> No cookie concent given");
      return;
    }

    Router.events.on("routeChangeComplete", ezDisplayAds);
    return () => Router.events.off("routeChangeComplete", ezDisplayAds);
  }, [acceptedCookieConsent, route]);
};

export const ezDisplayAds = () => {
  if (typeof ezstandalone === "undefined") {
    return;
  }

  const csgoEzoicCodes = findAdCode();
  if (!csgoEzoicCodes.length) {
    return;
  }

  try {
    ezstandalone.define(csgoEzoicCodes);

    if (!ezstandalone.scriptsLoaded) {
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable display");
    } else if (ezstandalone.scriptsLoaded) {
      ezstandalone.refresh();
      console.log("> refresh");
    }
  } catch (error) {
    console.warn("> ezstandalone error", error);
    return;
  }
};

function findAdCode() {
  function isHidden(el: any) {
    return el.offsetParent === null;
  }

  const adIds: number[] = [];

  const elements = document.querySelectorAll(
    'div[id^="ezoic-pub-ad-placeholder"]'
  );

  elements.forEach((el) => {
    if (isHidden(el)) {
      return;
    }

    try {
      const id = Number(el.id.split("-").pop());
      adIds.push(id);
    } catch (error) {
      console.error("Failed to parse ad id");
    }
  });

  return adIds;
}
