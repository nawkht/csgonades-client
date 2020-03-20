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

export const ezDisplayAds = async () => {
  const csgoEzoicCodes = findAdCode();

  try {
    if (!ezstandalone.initialized) {
      ezstandalone.init();
      console.log("> ez-init called waiting abit");
      await sleep(1000);
    }

    if (!ezstandalone.enabled) {
      await sleep(1000);
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> ez-enable-display", csgoEzoicCodes);
    } else {
      await sleep(1000);
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.refresh();
      console.log("> ez-refresh");
    }
  } catch (error) {
    console.error("> ez error", error);
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
