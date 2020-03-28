import { useEffect } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { route, query } = useRouter();

  useEffect(() => {
    if (route.includes("adtesting")) {
      return;
    }
    const delay = setTimeout(() => {
      ezDisplayAds();
    }, 500);
    return () => clearTimeout(delay);
  }, [query, route]);
};

export const ezDisplayAds = () => {
  if (typeof ezstandalone === "undefined") {
    return;
  }

  const csgoEzoicCodes = findAdCode();
  if (!csgoEzoicCodes.length) {
    return;
  }

  try {
    ezstandalone.define(csgoEzoicCodes);

    if (!ezstandalone.enabled) {
      ezstandalone.enable();
      ezstandalone.refresh();
    } else {
      ezstandalone.refresh();
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
