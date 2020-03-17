import { useEffect, useState } from "react";
import Router from "next/router";

const DEBUG = true;

export const useAdRefresher = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    const delay = setTimeout(() => {
      const ids = findAdCode();
      ezInit(ids);
      setLoaded(true);
    }, 1000);
    return () => {
      clearTimeout(delay);
    };
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      try {
        ezstandalone.destroy();
      } catch (error) {
        console.warn(error);
      }
    };

    const handleRouteChangeEnd = () => {
      setTimeout(() => {
        const ids = findAdCode();
        ezInit(ids);
      }, 1000);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeEnd);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeEnd);
    };
  }, []);
};

function isHidden(el: any) {
  return el.offsetParent === null;
}

function ezInit(codes: number[]) {
  const codesString = codes.join(",");
  try {
    if (!ezstandalone.enabled) {
      if (DEBUG) {
        console.log("ezstandalone.init()");
      }
      ezstandalone.init();
      if (DEBUG) {
        console.log(`ezstandalone.define(${codesString})`);
      }
      ezstandalone.define(...codes);
      if (DEBUG) {
        console.log(`ezstandalone.enable()`);
      }
      ezstandalone.enable();
      if (DEBUG) {
        console.log(`ezstandalone.display()`);
      }
      ezstandalone.display();
    } else {
      if (DEBUG) {
        console.log(`ezstandalone.define(${codesString})`);
      }
      ezstandalone.define(...codes);
      if (DEBUG) {
        console.log(`ezstandalone.refresh()`);
      }
      ezstandalone.refresh();
    }
  } catch (error) {}
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
