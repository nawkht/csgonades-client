import { useEffect } from "react";
import Router, { useRouter } from "next/router";

export const useAdRefresher = () => {
  const { pathname, query } = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", destroyAds);
    return () => Router.events.off("routeChangeStart", destroyAds);
  }, []);

  useEffect(() => {
    ezDisplayAds();
  }, [pathname, query]);
};

const destroyAds = () => {
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

    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> ez display", csgoEzoicCodes);
      });
    } else if (ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.refresh();
        console.log("> ez refresh", csgoEzoicCodes);
      });
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
