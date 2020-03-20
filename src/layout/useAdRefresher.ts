import { useEffect, useCallback, useState } from "react";
import Router from "next/router";

function delayedRefresh(seconds: number) {
  return function() {
    setTimeout(ezDisplayAds, seconds * 1000);
  };
}

export const useAdRefresher = () => {
  const [hasChangedRoute, setHasChangedRoute] = useState(false);

  const slowInit = useCallback(() => {
    if (!hasChangedRoute) {
      console.log("First page load, slow init");
      delayedRefresh(3)();
    }
  }, [hasChangedRoute]);

  const onRouteChange = useCallback(() => {
    console.log("On Route change, quick refresh");
    setHasChangedRoute(true);
    delayedRefresh(0.5)();
  }, []);

  useEffect(() => {
    slowInit();

    Router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [onRouteChange, slowInit]);
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
