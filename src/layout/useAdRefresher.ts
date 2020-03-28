import { useEffect } from "react";
import Router, { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { route } = useRouter();

  useEffect(() => {
    if (route.includes("adtesting")) {
      return;
    }

    ezRefreshAds();

    Router.events.on("routeChangeComplete", ezRefreshAds);
    return () => Router.events.off("routeChangeComplete", ezRefreshAds);
  }, [route]);
};

export const ezRefreshAds = () => {
  try {
    if (typeof ezstandalone === "undefined") {
      return;
    }

    const csgoEzoicCodes = findAdCode();
    if (!csgoEzoicCodes.length) {
      return;
    }

    if (!ezstandalone.scriptsLoaded) {
      ezstandalone.define(csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable display");
    } else if (ezstandalone.scriptsLoaded) {
      ezstandalone.define(csgoEzoicCodes);
      ezstandalone.refresh();
      console.log("> refresh");
    }
  } catch (error) {
    console.warn("> ezstandalone error", error);
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
