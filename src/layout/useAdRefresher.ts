import { useEffect } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { route, query } = useRouter();

  useEffect(() => {
    if (route.includes("adtesting")) {
      return;
    }
    const delay = setTimeout(() => {
      ezRefreshAds();
    }, 500);

    return () => {
      if (delay) {
        clearTimeout(delay);
      }
    };
  }, [route, query]);
};

export const ezRefreshAds = (tries = 0) => {
  if (tries > 2) {
    return;
  }

  try {
    if (typeof ezstandalone === "undefined") {
      setTimeout(() => {
        ezRefreshAds(tries + 1);
      }, 1000);
      return;
    }

    const csgoEzoicCodes = findAdCode();
    if (!csgoEzoicCodes.length) {
      return;
    }

    if (!ezstandalone.scriptsLoaded) {
      ezstandalone.cmd.push(function () {
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
      });
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
