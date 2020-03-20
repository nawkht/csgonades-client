import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    setTimeout(() => {
      ezDisplayAds();
    }, 1000);

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
      console.log("> ez-init");
      ezstandalone.init();
    }

    if (!ezstandalone.enabled) {
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> ez-enable-display", csgoEzoicCodes);
    } else {
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.refresh();
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
