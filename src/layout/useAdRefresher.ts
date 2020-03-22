import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAdRefresher = () => {
  const { pathname, query } = useRouter();

  useEffect(() => {
    ezDisplayAds();
  }, [pathname, query]);
};

export const ezDisplayAds = async (tries = 0) => {
  if (tries >= 2) {
    return;
  }

  if (typeof ezstandalone === "undefined") {
    setTimeout(() => {
      ezDisplayAds(tries + 1);
    }, 2000);
    return;
  }

  try {
    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(displayAds);
    } else {
      ezstandalone.cmd.push(refreshAds);
    }
  } catch (error) {
    return;
  }
};

function displayAds() {
  const csgoEzoicCodes = findAdCode();
  ezstandalone.setIsPWA();
  ezstandalone.define(...csgoEzoicCodes);
  ezstandalone.enable();
  ezstandalone.display();
  console.log("> ez display");
}

function refreshAds() {
  const csgoEzoicCodes = findAdCode();
  ezstandalone.define(...csgoEzoicCodes);
  ezstandalone.refresh();
  console.log("> ez refresh");
}

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
