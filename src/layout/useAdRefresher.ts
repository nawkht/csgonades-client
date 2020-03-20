import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    ezDisplayAds();
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeComplete", ezDisplayAds);

    return () => {
      Router.events.off("routeChangeComplete", ezDisplayAds);
    };
  }, []);
};

function isHidden(el: any) {
  return el.offsetParent === null;
}

function findAdCode() {
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

function ezDisplayAds() {
  try {
    if (!ezstandalone.initialized && ezstandalone.init) {
      console.log("> Ez init begin");
      ezstandalone.setIsPWA();
      ezstandalone.init();
      console.log("> Ez init done");
    }

    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        const csgoEzoicCodes = findAdCode();
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> Enable - Display", csgoEzoicCodes);
      });
    } else {
      ezstandalone.cmd.push(function() {
        const csgoEzoicCodes = findAdCode();
        ezstandalone.define(...csgoEzoicCodes);
        if (!ezstandalone.hasDisplayedAds) {
          ezstandalone.display();
          console.log("> Display");
        }

        ezstandalone.refresh();
        console.log("> Refresh done", csgoEzoicCodes);
      });
    }
  } catch (error) {
    return;
  }
}
