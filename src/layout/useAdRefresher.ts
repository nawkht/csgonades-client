import { useEffect } from "react";
import { useRouter } from "next/router";
import { IS_PROD } from "../constants/Constants";

const isBrowser = typeof window !== "undefined";

export const useNewAdRefresher = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (asPath.includes("adtesting") || (!isBrowser && !IS_PROD)) {
      return;
    }
    ezRefreshAds();
  }, [asPath]);
};

const ezRefreshAds = (tries = 0) => {
  if (tries > 2) {
    return;
  }

  const ezoicInitialized = typeof ezstandalone !== "undefined";

  if (!ezoicInitialized) {
    setTimeout(() => {
      ezRefreshAds(tries + 1);
    }, 500);
    return;
  }

  try {
    if (!ezstandalone.enabled) {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable display", csgoEzoicCodes);
    } else if (ezstandalone.enabled && ezstandalone.hasDisplayedAds) {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(csgoEzoicCodes);
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
