import { useEffect } from "react";
import { useRouter } from "next/router";
import { IS_PROD, Config } from "../constants/Constants";

const isBrowser = typeof window !== "undefined";

export const useNewAdRefresher = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (!isBrowser || !IS_PROD || !Config.ADS_ENABLED) {
      return;
    }
    ezRefreshAds();
  }, [asPath]);
};

const ezRefreshAds = async (tries = 0) => {
  if (tries > 2) {
    return;
  }

  const ezoicInitialized = typeof ezstandalone !== "undefined";

  if (!ezoicInitialized) {
    setTimeout(() => {
      ezRefreshAds(tries + 1);
    }, 500);
    return;
  }

  try {
    if (!ezstandalone.enabled) {
      ezstandalone.enable();
    }

    sleep(500);

    const csgoEzoicCodes = findAdCode();
    ezstandalone.define(csgoEzoicCodes);
    ezstandalone.refresh();
    console.log("> refresh", csgoEzoicCodes.toString());
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
