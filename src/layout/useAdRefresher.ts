import { useEffect } from "react";

export const useNewAdRefresher = () => {
  useEffect(() => {
    const delay = setTimeout(() => {
      ezRefreshAds();
    }, 500);
    return () => clearTimeout(delay);
  }, []);
};

export const ezRefreshAds = () => {
  try {
    const ezstandalone = (window.ezstandalone = window.ezstandalone || {});
    ezstandalone.cmd = ezstandalone.cmd || [];

    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function () {
        const csgoEzoicCodes = findAdCode();
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> enable display", csgoEzoicCodes);
      });
    } else {
      ezstandalone.cmd.push(function () {
        const csgoEzoicCodes = findAdCode();
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.refresh();
        console.log("> refresh", csgoEzoicCodes);
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
