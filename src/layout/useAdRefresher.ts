import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    ezDisplayAds();

    Router.events.on("routeChangeComplete", ezDisplayAds);

    return () => {
      Router.events.off("routeChangeComplete", ezDisplayAds);
    };
  }, []);
};

export const ezDisplayAds = async (tries = 0) => {
  if (tries >= 2) {
    return;
  }

  if (typeof ezstandalone === "undefined") {
    setTimeout(() => {
      ezDisplayAds(tries + 1);
    }, 2000);
  }

  try {
    if (!ezstandalone.initialized) {
      ezstandalone.setIsPWA();
      ezstandalone.init();
    }

    if (!ezstandalone.enabled) {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
    } else {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.refresh();
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

  elements.forEach(el => {
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

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
