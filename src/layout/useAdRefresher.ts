import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    setTimeout(() => ezDisplayAds(), 1000);
  }, []);

  useEffect(() => {
    const rounteChangeHandler = () => {
      setTimeout(() => ezDisplayAds(), 1000);
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
    const codes = findAdCode();

    if (!ezstandalone.enabled || !ezstandalone.hasDisplayedAds) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("display", codes);
      });
    } else {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.refresh();
        console.log("refresh", codes);
      });
    }
  } catch (error) {
    return;
  }
}
