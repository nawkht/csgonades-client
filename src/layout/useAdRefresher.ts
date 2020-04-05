import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookieConcent } from "../store/GlobalStore/GlobalHooks";

export const useNewAdRefresher = () => {
  const { asPath } = useRouter();
  const { acceptedCookieConsent } = useCookieConcent();

  useEffect(() => {
    if (asPath.includes("adtesting") || !acceptedCookieConsent) {
      return;
    }
    const delay = setTimeout(() => {
      ezRefreshAds();
    }, 500);
    return () => clearTimeout(delay);
  }, [asPath, acceptedCookieConsent]);
};

const ezRefreshAds = () => {
  try {
    if (!ezstandalone.enabled) {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable display", csgoEzoicCodes);
    } else if (ezstandalone.enabled && ezstandalone.hasDisplayedAds) {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.refresh();
      console.log("> refresh", csgoEzoicCodes);
    }
  } catch (error) {
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
