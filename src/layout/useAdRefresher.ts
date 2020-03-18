import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    const delayInit = setTimeout(tryInit, 1500);

    return () => {
      clearTimeout(delayInit);
    };
  });

  useEffect(() => {
    const rounteChangeHandler = () => {
      setTimeout(() => {
        ezDisplayAds();
      }, 1000);
    };

    Router.events.on("routeChangeComplete", rounteChangeHandler);

    return () => {
      Router.events.off("routeChangeComplete", rounteChangeHandler);
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

function tryInit() {
  try {
    if (!ezstandalone.initialized) {
      ezstandalone.init();
      console.log("> ezstandalone init");
      ezDisplayAds();
    }
  } catch (error) {
    console.warn("Failed to initialize eezstandalone", error);
  }
}

function ezDisplayAds() {
  try {
    const codes = findAdCode();
    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> ezstandalone enable display", codes);
      });
    } else {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.refresh();
        console.log("> ezstandalone refresh", codes);
      });
    }
  } catch (error) {
    console.warn("Failed to display ads", error);
  }
}
