import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookieConcent } from "../store/GlobalStore/GlobalHooks";

export const useNewAdRefresher = () => {
  const { acceptedCookieConsent } = useCookieConcent();
  const { route, pathname } = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (route.includes("adtesting") || !acceptedCookieConsent) {
        return;
      }

      ezRefreshAds();
    }, 500);
    return () => clearTimeout(delay);
  }, [route, acceptedCookieConsent, pathname]);
};

export const ezRefreshAds = () => {
  try {
    if (typeof ezstandalone === "undefined") {
      return;
    }

    const csgoEzoicCodes = findAdCode();
    if (!csgoEzoicCodes.length) {
      return;
    }

    if (!ezstandalone.scriptsLoaded) {
      ezstandalone.define(csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable display");
    } else if (ezstandalone.scriptsLoaded) {
      ezstandalone.define(csgoEzoicCodes);
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
