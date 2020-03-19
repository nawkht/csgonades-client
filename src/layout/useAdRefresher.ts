import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    const delayInit = setTimeout(ezDisplayAds, 1500);

    return () => {
      clearTimeout(delayInit);
    };
  }, []);

  useEffect(() => {
    let routeChangeAdRefresh: NodeJS.Timeout;

    const rounteChangeHandler = () => {
      if (routeChangeAdRefresh) {
        clearTimeout(routeChangeAdRefresh);
      }
      routeChangeAdRefresh = setTimeout(ezDisplayAds, 750);
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

function ezDisplayAds() {
  try {
    if (!ezstandalone.initialized) {
      ezstandalone.init();
      console.log("> Ez init");
    }

    const codes = findAdCode();

    if (!ezstandalone.enabled || !ezstandalone.hasDisplayedAds) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> Ez enable, display:", codes.join(","));
      });
    } else {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.refresh();
        console.log("> Ez refresh:", codes.join(","));
      });
    }
  } catch (error) {
    console.warn("Failed to display ads", error);
  }
}
