import { useEffect } from "react";
import Router from "next/router";

export const useAdRefresher = () => {
  useEffect(() => {
    slowInit();
    setTimeout(() => ezDisplayAds(), 1000);
  }, []);

  useEffect(() => {
    const rounteChangeHandler = () => {
      setTimeout(() => ezDisplayAds(), 1000);
    };

    const routeChangeBegin = () => {
      try {
        ezstandalone.destroy();
        console.log("> destroy");
      } catch (e) {}
    };

    Router.events.on("routeChangeComplete", rounteChangeHandler);
    Router.events.on("routeChangeStart", routeChangeBegin);

    return () => {
      Router.events.off("routeChangeComplete", rounteChangeHandler);
      Router.events.off("routeChangeStart", routeChangeBegin);
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

function slowInit() {
  if (!ezstandalone.initialized && ezstandalone.init) {
    console.log("ezstandalone > init");
    ezstandalone.init();
  }
}

function ezDisplayAds() {
  try {
    const codes = findAdCode();

    if (
      !ezstandalone.define ||
      !ezstandalone.enable ||
      !ezstandalone.display ||
      !ezstandalone.refresh ||
      !ezstandalone.initialized
    ) {
      console.warn("> Ez Not Inited");
      return;
    }

    ezstandalone.define(...codes);
    console.log("> Define", codes);

    if (!ezstandalone.enabled) {
      ezstandalone.enable();
      console.log("> Enable");
    }

    if (!ezstandalone.hasDisplayedAds) {
      ezstandalone.display();
      console.log("> Display");
    } else {
      ezstandalone.refresh();
      console.log("> Refresh");
    }
  } catch (error) {
    return;
  }
}
