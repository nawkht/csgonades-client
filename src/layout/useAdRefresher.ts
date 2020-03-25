import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    console.log("> Ad refresher");

    let showDelay: NodeJS.Timer;

    setTimeout(() => {
      ezDisplayAds();
    }, 500);

    function onRouteChangeBegin() {
      if (showDelay) {
        clearTimeout(showDelay);
      }
      ezDestroy();
    }

    function onRouteChangeComplete() {
      showDelay = setTimeout(() => {
        ezDisplayAds();
      }, 500);
    }

    Router.events.on("routeChangeStart", onRouteChangeBegin);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", onRouteChangeBegin);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      clearTimeout(showDelay);
    };
  }, []);
};

const ezDestroy = () => {
  try {
    ezstandalone.destroy();
  } catch (error) {
    // no-op
  }
};

export const ezDisplayAds = (tries = 0) => {
  if (tries >= 4) {
    return;
  }

  if (typeof ezstandalone === "undefined") {
    setTimeout(() => {
      ezDisplayAds(tries + 1);
    }, 500);
    return;
  }

  try {
    const csgoEzoicCodes = findAdCode();

    if (!csgoEzoicCodes.length) {
      return;
    }

    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> Placeholders", csgoEzoicCodes.join(","));
      });
    } else if (ezstandalone.enabled) {
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.refresh();
    }

    ezstandalone.init();
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
