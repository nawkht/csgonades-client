import { useEffect, useState, useCallback } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  const [routeChangeCounter, setRouteChangeCounter] = useState(0);
  const [delay, setDelay] = useState(3);

  const onPageChange = useCallback(() => {
    setRouteChangeCounter(routeChangeCounter + 1);
    const delayedRefresh = setTimeout(() => {
      ezDisplayAds();
      setDelay(0.5);
    }, delay * 1000);
    return () => clearTimeout(delayedRefresh);
  }, [delay, routeChangeCounter]);

  useEffect(() => {
    if (routeChangeCounter > 0) {
      return;
    }
    const firstCallDelay = setTimeout(() => {
      ezDisplayAds();
      setDelay(0.5);
    }, 3000);
    return () => clearTimeout(firstCallDelay);
  }, [routeChangeCounter]);

  useEffect(() => {
    Router.events.on("routeChangeComplete", onPageChange);

    return () => {
      Router.events.off("routeChangeComplete", onPageChange);
    };
  }, [onPageChange]);
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
      ezstandalone.setIsPWA();
      ezstandalone.init();
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
