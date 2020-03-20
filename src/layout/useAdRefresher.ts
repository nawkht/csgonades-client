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
  if (tries > 3) {
    return;
  }

  if (typeof ezstandalone === "undefined") {
    console.log("> ez script not loaded, trying again in 1 sec");
    setTimeout(() => {
      ezDisplayAds(tries + 1);
    }, 1000);
  }

  try {
    if (!ezstandalone.initialized) {
      ezstandalone.setIsPWA();
      ezstandalone.init();
      console.log("> ez-init called waiting abit");
      await sleep(1000);
    }

    if (!ezstandalone.enabled) {
      await sleep(1000);
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> ez-enable-display", csgoEzoicCodes);
    } else {
      await sleep(1000);
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.refresh();
      console.log("> ez-refresh");
    }
  } catch (error) {
    console.log("> ez failed");
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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
